"use client";

import { useState } from "react";
import CountryFlag from "./CountryFlag";
import TechIcon from "./TechIcon";

export interface BreakdownItem {
  name: string;
  count: number;
  total?: number;
  percentage?: number;
}

interface BreakdownListProps {
  tabs: string[];
  data: Record<string, BreakdownItem[]>;
  columns?: string[];
}

export default function BreakdownList({
  tabs,
  data,
  columns = ["VISITORS"],
}: BreakdownListProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const currentItems = data[activeTab] || [];
  const isCountriesTab = activeTab === "Countries";
  const isTechTab = ["Devices", "Browsers", "Operating Systems"].includes(activeTab);

  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col gap-6 flex-1">
      {/* Header Tabs & Column Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors relative pb-2 cursor-pointer ${
                  isActive ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-6 text-xs font-light text-neutral-400 tracking-wider">
          {columns.map((col, idx) => (
            <span key={idx}>{col}</span>
          ))}
        </div>
      </div>

      {/* List items */}
      <div className="flex flex-col gap-2 min-h-[180px]">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10 text-neutral-400">
            <span className="text-xs font-light">No records found for selected period</span>
          </div>
        ) : (
          currentItems.map((item, idx) => {
            const pct = item.percentage ?? Math.min(100, Math.round((item.count / (currentItems[0]?.count || 1)) * 100));
            return (
              <div
                key={idx}
                className="relative flex items-center justify-between py-2.5 px-3 rounded-xl overflow-hidden hover:bg-neutral-50/70 transition-colors"
              >
                {/* Subtle horizontal progress background */}
                <div
                  className="absolute inset-y-0 left-0 bg-neutral-100/50 rounded-xl pointer-events-none"
                  style={{ width: `${pct}%` }}
                />

                <div className="relative z-10 flex items-center gap-2.5 truncate max-w-[200px]">
                  {isCountriesTab && (
                    <CountryFlag country={item.name} className="w-4 h-3 rounded-[2px] object-cover shrink-0" />
                  )}
                  {isTechTab && (
                    <TechIcon name={item.name} size={16} className="text-neutral-600 shrink-0" />
                  )}
                  <span className="font-normal text-sm text-neutral-800 truncate">
                    {item.name}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-6 text-sm font-light text-neutral-900">
                  <span>{item.count.toLocaleString()}</span>
                  {item.total !== undefined && (
                    <span className="text-neutral-400 min-w-[36px] text-right">
                      {item.total.toLocaleString()}
                    </span>
                  )}
                  {item.percentage !== undefined && item.total === undefined && columns.includes("PERCENT") && (
                    <span className="text-neutral-400 min-w-[36px] text-right">
                      {item.percentage}%
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
