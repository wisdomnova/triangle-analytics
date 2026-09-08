"use client";

interface SegmentProgressProps {
  percentage: number;
  description: string;
  gradient?: string;
  segmentsCount?: number;
}

export default function SegmentProgress({
  percentage,
  description,
  gradient = "from-amber-400 to-rose-400",
  segmentsCount = 20,
}: SegmentProgressProps) {
  const activeSegments = Math.round((percentage / 100) * segmentsCount);

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl flex-1">
      <div className="flex items-center justify-between text-xs font-light text-neutral-400 px-0.5">
        <span>0%</span>
        <span>100%</span>
      </div>

      <div className="flex items-center gap-1 w-full h-8">
        {Array.from({ length: segmentsCount }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <div
              key={i}
              className={`flex-1 h-full rounded-sm transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${gradient}`
                  : "bg-neutral-100"
              }`}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <span className="text-4xl font-light text-neutral-900 tracking-tight">
          {percentage}%
        </span>
        <span className="text-xs font-light text-neutral-500 leading-relaxed mt-1">
          {description}
        </span>
      </div>
    </div>
  );
}
