"use client";

import { useState } from "react";

export interface BreakdownItem {
  name: string;
  count: number;
  percentage?: number;
}

interface BreakdownListProps {
  tabs: string[];
  data: Record<string, BreakdownItem[]>;
}

export default function BreakdownList({ tabs, data }: BreakdownListProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const currentItems = data[activeTab] || [];

  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-normal transition-colors relative pb-2 cursor-pointer ${
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

        <span className="text-xs font-light text-neutral-400 tracking-wider">
          VISITORS
        </span>
      </div>

      <div className="flex flex-col gap-3 min-h-[160px]">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8 text-neutral-400">
            <span className="text-xs font-light">No data found for selected period</span>
          </div>
        ) : (
          currentItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 text-sm">
              <span className="font-normal text-neutral-700 truncate max-w-[220px]">
                {item.name}
              </span>
              <span className="font-light text-neutral-900">
                {item.count.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
