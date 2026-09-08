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

  const breakdownDataLeft = {
    Pages: [
      { name: "/", count: 6420 },
      { name: "/pricing", count: 2180 },
      { name: "/docs", count: 1840 },
      { name: "/auth/join", count: 960 },
      { name: "/blog", count: 520 },
    ],
    Routes: [
      { name: "/api/v1/event", count: 24800 },
      { name: "/api/v1/track", count: 18200 },
      { name: "/api/v1/session", count: 5290 },
    ],
    Hostnames: [
      { name: "app.domain.com", count: 9400 },
      { name: "www.domain.com", count: 3080 },
    ],
  };

  const breakdownDataRight = {
    Referrers: [
      { name: "Google Organic", count: 4850 },
      { name: "Direct Traffic", count: 3120 },
      { name: "Twitter / X", count: 1840 },
      { name: "GitHub", count: 1210 },
      { name: "Hacker News", count: 640 },
    ],
    "UTM Parameters": [
      { name: "utm_source=twitter", count: 1420 },
      { name: "utm_source=newsletter", count: 890 },
      { name: "utm_campaign=product_hunt", count: 480 },
    ],
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-xl font-light text-neutral-900">
          Real time web traffic and visitor engagement overview
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-neutral-100/70 rounded-xl px-4 py-2.5 text-xs font-light text-neutral-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>12 online now</span>
          </div>

          <Dropdown
            options={environmentOptions}
            selected={selectedEnvironment}
            onChange={setSelectedEnvironment}
            widthClass="w-44"
          />

          <Dropdown
            options={dateRangeOptions}
            selected={selectedDateRange}
            onChange={setSelectedDateRange}
            widthClass="w-40"
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

      {/* Breakdown Panels Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <BreakdownList
          tabs={["Pages", "Routes", "Hostnames"]}
          data={breakdownDataLeft}
        />
        <BreakdownList
          tabs={["Referrers", "UTM Parameters"]}
          data={breakdownDataRight}
        />
      </div>
    </div>
  );
}
