"use client";

import { useState } from "react";
import Dropdown from "@/components/dashboard/Dropdown";
import MetricsTabs from "@/components/dashboard/MetricsTabs";
import TrafficChart from "@/components/dashboard/TrafficChart";
import SegmentProgress from "@/components/dashboard/SegmentProgress";
import BreakdownList from "@/components/dashboard/BreakdownList";

export default function OverviewPage() {
  const [activeMetric, setActiveMetric] = useState("visitors");
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("7d");

  const environmentOptions = [
    { value: "all", label: "All environments" },
    { value: "production", label: "Production" },
    { value: "staging", label: "Staging" },
  ];

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "12m", label: "Last 12 Months" },
  ];

  const metrics = [
    { id: "visitors", label: "Visitors", value: "12,480", subValue: "+14%" },
    { id: "pageviews", label: "Page Views", value: "48,290", subValue: "+8%" },
    { id: "bouncerate", label: "Bounce Rate", value: "28%", subValue: "-3%" },
  ];

  const chartData = [
    { date: "Mon", visitors: 1400, pageViews: 4200, bounceRate: 31 },
    { date: "Tue", visitors: 1850, pageViews: 5400, bounceRate: 29 },
    { date: "Wed", visitors: 2200, pageViews: 6800, bounceRate: 27 },
    { date: "Thu", visitors: 1950, pageViews: 5900, bounceRate: 30 },
    { date: "Fri", visitors: 2700, pageViews: 8100, bounceRate: 26 },
    { date: "Sat", visitors: 3400, pageViews: 10200, bounceRate: 24 },
    { date: "Sun", visitors: 4200, pageViews: 12500, bounceRate: 22 },
  ];

  const pagesData = {
    Pages: [
      { name: "/", count: 6420, percentage: 51 },
      { name: "/pricing", count: 2180, percentage: 17 },
      { name: "/docs", count: 1840, percentage: 15 },
      { name: "/auth/join", count: 960, percentage: 8 },
      { name: "/blog", count: 520, percentage: 4 },
    ],
    Routes: [
      { name: "/api/v1/event", count: 24800, percentage: 54 },
      { name: "/api/v1/track", count: 18200, percentage: 39 },
      { name: "/api/v1/session", count: 5290, percentage: 11 },
    ],
    Hostnames: [
      { name: "app.domain.com", count: 9400, percentage: 75 },
      { name: "www.domain.com", count: 3080, percentage: 25 },
    ],
  };

  const referrersData = {
    Referrers: [
      { name: "Google Organic", count: 4850, percentage: 39 },
      { name: "Direct Traffic", count: 3120, percentage: 25 },
      { name: "Twitter / X", count: 1840, percentage: 15 },
      { name: "GitHub", count: 1210, percentage: 10 },
      { name: "Hacker News", count: 640, percentage: 5 },
    ],
    "UTM Parameters": [
      { name: "utm_source=twitter", count: 1420, percentage: 45 },
      { name: "utm_source=newsletter", count: 890, percentage: 28 },
      { name: "utm_campaign=launch_v2", count: 480, percentage: 15 },
    ],
  };

  const countriesData = {
    Countries: [
      { name: "Nigeria", count: 4820, percentage: 39 },
      { name: "United States", count: 3410, percentage: 27 },
      { name: "United Kingdom", count: 1890, percentage: 15 },
      { name: "Germany", count: 980, percentage: 8 },
      { name: "Canada", count: 720, percentage: 6 },
    ],
  };

  const devicesData = {
    Devices: [
      { name: "Desktop", count: 8420, percentage: 67 },
      { name: "Mobile", count: 3410, percentage: 27 },
      { name: "Tablet", count: 650, percentage: 5 },
    ],
    Browsers: [
      { name: "Chrome", count: 7120, percentage: 57 },
      { name: "Safari", count: 3240, percentage: 26 },
      { name: "Firefox", count: 1180, percentage: 9 },
      { name: "Edge", count: 940, percentage: 8 },
    ],
  };

  const osData = {
    "Operating Systems": [
      { name: "Mac", count: 6180, percentage: 50 },
      { name: "Windows", count: 3820, percentage: 31 },
      { name: "iOS", count: 1420, percentage: 11 },
      { name: "Android", count: 860, percentage: 7 },
      { name: "Linux", count: 200, percentage: 2 },
    ],
  };

  const eventsData = {
    Events: [
      { name: "signup_submitted", count: 960, total: 1240 },
      { name: "pricing_plan_selected", count: 640, total: 820 },
      { name: "script_verified", count: 410, total: 530 },
      { name: "docs_copied", count: 280, total: 390 },
      { name: "report_exported", count: 120, total: 160 },
    ],
  };

  const flagsData = {
    Flags: [
      { name: "experiment_new_pricing_v2", count: 4200, total: 6800 },
      { name: "feature_live_websocket", count: 3100, total: 4900 },
      { name: "flag_dark_theme_default", count: 1800, total: 2400 },
      { name: "flag_cookie_free_telemetry", count: 1200, total: 1700 },
    ],
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
          Real time overview
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white hover:bg-neutral-50 rounded-xl px-4 h-11 text-sm font-medium text-neutral-900 select-none cursor-default transition-colors">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>12 online now</span>
          </div>

          <Dropdown
            options={environmentOptions}
            selected={selectedEnvironment}
            onChange={setSelectedEnvironment}
            widthClass="w-44"
            variant="white"
          />

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
          percentage={83}
          description="Visitors completing product onboarding flow without navigation dropoff"
          gradient="from-amber-400 to-rose-400"
        />
        <SegmentProgress
          percentage={58}
          description="Inbound traffic sessions originating directly from organic search"
          gradient="from-yellow-400 to-teal-400"
        />
        <SegmentProgress
          percentage={47}
          description="Desktop and tablet sessions converting into active platform accounts"
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
          tabs={["Countries"]}
          data={countriesData}
        />
        <BreakdownList
          tabs={["Devices", "Browsers"]}
          data={devicesData}
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
          columns={["VISITORS", "TOTAL"]}
        />
        <BreakdownList
          tabs={["Flags"]}
          data={flagsData}
          columns={["VISITORS", "TOTAL"]}
        />
      </div>
    </div>
  );
}
