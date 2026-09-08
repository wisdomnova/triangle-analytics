"use client";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  subValue?: string;
}

interface MetricsTabsProps {
  metrics: MetricItem[];
  activeMetric: string;
  onSelectMetric: (id: string) => void;
}

export default function MetricsTabs({
  metrics,
  activeMetric,
  onSelectMetric,
}: MetricsTabsProps) {
  return (
    <div className="flex items-center gap-4 w-full overflow-x-auto">
      {metrics.map((item) => {
        const isActive = item.id === activeMetric;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectMetric(item.id)}
            className={`flex flex-col items-start text-left p-6 rounded-2xl min-w-[200px] flex-1 transition-all cursor-pointer ${
              isActive ? "bg-white" : "bg-transparent hover:bg-neutral-100/40"
            }`}
          >
            <span className="text-xs font-normal text-neutral-400">
              {item.label}
            </span>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-normal text-neutral-900 tracking-tight">
                {item.value}
              </span>
              {item.subValue && (
                <span className="text-xs font-normal text-neutral-400">
                  {item.subValue}
                </span>
              )}
            </div>
            {isActive && (
              <div className="w-8 h-0.5 bg-neutral-900 rounded-full mt-4" />
            )}
          </button>
        );
      })}
    </div>
  );
}
