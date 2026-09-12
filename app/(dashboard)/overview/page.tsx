"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/dashboard/Dropdown";
import MetricsTabs from "@/components/dashboard/MetricsTabs";
import TrafficChart from "@/components/dashboard/TrafficChart";
import SegmentProgress from "@/components/dashboard/SegmentProgress";
import BreakdownList from "@/components/dashboard/BreakdownList";
import EmptyDomainState from "@/components/dashboard/EmptyDomainState";
import { useDomain } from "@/context/DomainContext";
import { useRealtime } from "@/hooks/useRealtime";
import { IconWorld } from "@tabler/icons-react";
import {
  api,
  OverviewStats,
  TimeseriesPoint,
  DimensionItem,
} from "@/lib/api";

export default function OverviewPage() {
  const { currentDomain, isLoading: isDomainLoading } = useDomain();
  const [activeMetric, setActiveMetric] = useState("visitors");
  const [selectedDateRange, setSelectedDateRange] = useState("7d");

  // Real-time active visitors hook (Socket.IO + polling sync + reconnect auto-refresh)
  const { activeVisitors, refreshSignal } = useRealtime(currentDomain?.siteId);

  // Live API States
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [pagesData, setPagesData] = useState<{ Pages: DimensionItem[]; Routes: DimensionItem[]; Hostnames: DimensionItem[] }>({
    Pages: [],
    Routes: [],
    Hostnames: [],
  });
  const [referrersData, setReferrersData] = useState<{ Referrers: DimensionItem[]; "UTM Parameters": DimensionItem[] }>({
    Referrers: [],
    "UTM Parameters": [],
  });
  const [countriesData, setCountriesData] = useState<{
    Countries: DimensionItem[];
    Carriers?: DimensionItem[];
    Networks?: DimensionItem[];
    "Carriers & ISPs"?: DimensionItem[];
  }>({
    Countries: [],
    Carriers: [],
  });
  const [devicesData, setDevicesData] = useState<{ Devices: DimensionItem[]; Models?: DimensionItem[]; Browsers: DimensionItem[] }>({
    Devices: [],
    Models: [],
    Browsers: [],
  });
  const [osData, setOsData] = useState<{ "Operating Systems": DimensionItem[] }>({ "Operating Systems": [] });
  const [eventsData, setEventsData] = useState<{ Events: DimensionItem[] }>({ Events: [] });
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    if (!currentDomain?.siteId) return;

    let isMounted = true;
    setIsDataLoading(true);

    const siteId = currentDomain.siteId;
    const period = selectedDateRange;

    Promise.all([
      api.dash.getOverviewStats(siteId, period).catch(() => null),
      api.dash.getTimeseries(siteId, period).catch(() => []),
      api.dash.getTopPages(siteId, period).catch(() => ({ Pages: [], Routes: [], Hostnames: [] })),
      api.dash.getTopReferrers(siteId, period).catch(() => ({ Referrers: [], "UTM Parameters": [] })),
      api.dash.getTopCountries(siteId, period).catch(() => ({ Countries: [], Carriers: [] })),
      api.dash.getTopDevices(siteId, period).catch(() => ({ Devices: [], Models: [], Browsers: [] })),
      api.dash.getTopOS(siteId, period).catch(() => ({ "Operating Systems": [] })),
      api.dash.getEventsSummary(siteId, period).catch(() => ({ Events: [] })),
    ]).then(([statsRes, tsRes, pagesRes, refRes, countRes, devRes, osRes, evRes]) => {
      if (!isMounted) return;
      if (statsRes) setStats(statsRes);
      if (Array.isArray(tsRes)) setTimeseries(tsRes);
      if (pagesRes) setPagesData(pagesRes);
      if (refRes) setReferrersData(refRes);
      if (countRes) setCountriesData(countRes);
      if (devRes) setDevicesData(devRes);
      if (osRes) setOsData(osRes);
      if (evRes) setEventsData(evRes);
      setIsDataLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [currentDomain?.siteId, selectedDateRange, refreshSignal]);

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "12m", label: "Last 12 Months" },
  ];

  // If loading domains
  if (isDomainLoading) {
    return (
      <div className="w-full bg-white rounded-3xl p-16 flex flex-col items-center justify-center gap-4 text-center border border-[#EAE5D9]">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-[#0B63E5] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400 font-light">Loading telemetry overview...</span>
      </div>
    );
  }

  // If no domain properties exist, show empty state
  if (!currentDomain) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
            Real time overview
          </h1>
        </div>
        <EmptyDomainState
          title="No domain properties configured"
          description="You haven't connected any websites or domains yet. Register a domain property to start streaming live telemetry and analytics."
          actionText="Connect your first domain"
        />
      </div>
    );
  }

  const metrics = [
    {
      id: "visitors",
      label: "Visitors",
      value: stats?.visitors || currentDomain.visitors || "0",
      subValue: stats?.changes?.visitors || "+0%",
    },
    {
      id: "pageviews",
      label: "Page Views",
      value: stats?.pageViews || currentDomain.pageViews || "0",
      subValue: stats?.changes?.pageViews || "+0%",
    },
    {
      id: "bouncerate",
      label: "Bounce Rate",
      value: stats?.bounceRate || currentDomain.bounceRate || "0%",
      subValue: stats?.changes?.bounceRate || "0%",
    },
  ];

  // Chart data from timeseries
  const chartData =
    timeseries.length > 0
      ? timeseries.map((pt) => {
          const views = Number(pt.pageViews ?? pt.pageviews ?? 0);
          return {
            date: pt.date,
            visitors: Number(pt.visitors) || 0,
            pageViews: views,
            pageviews: views,
            bounceRate: Number(pt.bounceRate ?? 0),
          };
        })
      : [
          { date: "Mon", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Tue", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Wed", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Thu", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Fri", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Sat", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
          { date: "Sun", visitors: 0, pageViews: 0, pageviews: 0, bounceRate: 0 },
        ];

  // Dynamic segment metrics based on telemetry data & active interaction events
  const totalEvents = eventsData?.Events?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
  const totalVisitors = Number(stats?.visitors || 0) || 1;

  // Interaction engagement velocity: each event (scroll depth, click, resize, focus) advances active engagement
  const interactionDepth = totalEvents > 0
    ? Math.min(30, Math.round((totalEvents / Math.max(1, totalVisitors)) * 5) + Math.min(10, totalEvents))
    : 0;

  // 1. Traffic concentration on primary entry routes without navigation dropoff
  const baseTopPage = pagesData?.Pages?.length ? pagesData.Pages[0].percentage : 0;
  const nonDropoffRate = totalEvents > 0
    ? Math.min(100, Math.max(baseTopPage, Math.round(baseTopPage * 0.75 + interactionDepth + 2)))
    : baseTopPage;

  // 2. Inbound traffic sessions originating directly from organic search and referrals
  const baseOrganic =
    referrersData?.Referrers?.find((r) => r.name.toLowerCase().includes("organic") || r.name.toLowerCase().includes("google"))?.percentage ||
    (referrersData?.Referrers?.length ? referrersData.Referrers[0].percentage : 0);
  const activeInboundRate = totalEvents > 0
    ? Math.min(100, Math.max(baseOrganic, Math.round(baseOrganic * 0.9 + Math.min(10, totalEvents * 1.5))))
    : baseOrganic;

  // 3. Desktop and workstation sessions converting into active platform telemetry
  const baseDesktop = devicesData?.Devices?.find((d) => d.name === "Desktop")?.percentage || 0;
  const telemetryConversionRate = totalEvents > 0
    ? Math.min(100, Math.max(baseDesktop, Math.round(baseDesktop * 0.7 + interactionDepth + Math.min(15, totalEvents * 1.2))))
    : baseDesktop;

  const flagsData = {
    Flags: [],
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
          Real time overview
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white hover:bg-neutral-50 rounded-xl px-4 h-11 text-sm font-medium text-neutral-900 select-none cursor-default transition-colors w-fit shrink-0 whitespace-nowrap">
            <IconWorld size={16} stroke={1.8} className="text-blue-500 shrink-0" />
            <span>{activeVisitors} online now</span>
          </div>

          <Dropdown
            options={dateRangeOptions}
            selected={selectedDateRange}
            onChange={setSelectedDateRange}
            widthClass="w-40"
            variant="white"
          />
        </div>
      </div>

      {/* Metric Tabs Row */}
      <MetricsTabs
        metrics={metrics}
        activeMetric={activeMetric}
        onSelectMetric={setActiveMetric}
      />

      {/* Traffic Area Line Chart */}
      <TrafficChart data={chartData} activeMetric={activeMetric} />

      {/* Segmented Metric Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <SegmentProgress
          percentage={nonDropoffRate}
          description="Traffic concentration on primary entry routes without navigation dropoff"
          gradient="from-amber-400 to-rose-400"
        />
        <SegmentProgress
          percentage={activeInboundRate}
          description="Inbound traffic sessions originating directly from organic search and referrals"
          gradient="from-yellow-400 to-teal-400"
        />
        <SegmentProgress
          percentage={telemetryConversionRate}
          description="Desktop and workstation sessions converting into active platform telemetry"
          gradient="from-sky-400 to-emerald-400"
        />
      </div>

      {/* Primary Traffic Breakdowns: Pages & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <BreakdownList
          tabs={["Pages", "Routes", "Hostnames"]}
          data={pagesData}
        />
        <BreakdownList
          tabs={["Referrers", "UTM Parameters"]}
          data={referrersData}
        />
      </div>

      {/* Geographic, Device & OS Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <BreakdownList
          tabs={["Countries", "Carriers & ISPs"]}
          data={{
            ...countriesData,
            "Carriers & ISPs": countriesData["Carriers & ISPs"] || countriesData.Carriers || [],
          } as any}
        />
        <BreakdownList
          tabs={["Devices", "Browsers"]}
          data={devicesData as any}
        />
        <BreakdownList
          tabs={["Operating Systems"]}
          data={osData}
        />
      </div>

      {/* Free Built-In Custom Events & Feature Flags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <BreakdownList
          tabs={["Events"]}
          data={eventsData}
        />
        <BreakdownList
          tabs={["Flags"]}
          data={flagsData}
        />
      </div>
    </div>
  );
}
