"use client";

export function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-10 w-full animate-pulse">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="h-8 w-56 bg-neutral-200/80 rounded-xl" />
        <div className="flex items-center gap-3">
          <div className="h-11 w-36 bg-white rounded-xl" />
          <div className="h-11 w-40 bg-white rounded-xl" />
        </div>
      </div>

      {/* Metric Tabs */}
      <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden pb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col p-4 sm:p-6 rounded-2xl min-w-[140px] sm:min-w-[180px] flex-1 bg-white gap-3"
          >
            <div className="h-3 w-16 bg-neutral-200/70 rounded-md" />
            <div className="flex items-baseline gap-3 mt-1">
              <div className="h-8 w-20 bg-neutral-200/90 rounded-lg" />
              <div className="h-4 w-10 bg-neutral-200/60 rounded-md" />
            </div>
            {i === 1 && <div className="w-8 h-0.5 bg-neutral-300 rounded-full mt-2" />}
          </div>
        ))}
      </div>

      {/* Traffic Area Line Chart Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-neutral-200/70 rounded-md" />
          <div className="h-4 w-20 bg-neutral-200/60 rounded-md" />
        </div>
        <div className="w-full h-56 sm:h-72 flex items-end gap-3 pt-6">
          {[40, 65, 30, 85, 55, 75, 45].map((height, idx) => (
            <div
              key={idx}
              className="flex-1 bg-neutral-100 rounded-t-xl"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Segmented Metric Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-4 bg-white p-6 rounded-3xl flex-1">
            <div className="flex justify-between">
              <div className="h-3 w-6 bg-neutral-200/70 rounded-md" />
              <div className="h-3 w-8 bg-neutral-200/70 rounded-md" />
            </div>
            <div className="h-8 bg-neutral-100 rounded-lg" />
            <div className="h-9 w-20 bg-neutral-200/90 rounded-lg mt-2" />
            <div className="h-3 w-full bg-neutral-200/60 rounded-md" />
          </div>
        ))}
      </div>

      {/* Breakdown Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-neutral-200/80 rounded-md" />
              <div className="h-3 w-16 bg-neutral-200/60 rounded-md" />
            </div>
            <div className="flex flex-col gap-3 min-h-[160px]">
              {[1, 2, 3, 4].map((r) => (
                <div key={r} className="h-9 bg-neutral-50 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TablePageSkeleton({
  titleWidth = "w-60",
  hasPill = true,
}: {
  titleWidth?: string;
  hasPill?: boolean;
}) {
  return (
    <div className="flex flex-col gap-10 w-full animate-pulse">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className={`h-8 ${titleWidth} bg-neutral-200/80 rounded-xl`} />
          <div className="h-4 w-72 sm:w-96 bg-neutral-200/60 rounded-md" />
        </div>
        {hasPill && <div className="h-11 w-36 bg-white rounded-xl shrink-0" />}
      </div>

      {/* Table Card Skeleton */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 flex flex-col gap-4">
        {/* Table Header Row */}
        <div className="flex items-center justify-between py-2 border-b border-neutral-100">
          <div className="h-4 w-32 bg-neutral-200/80 rounded-md" />
          <div className="h-8 w-44 bg-neutral-100 rounded-xl" />
        </div>

        {/* Rows */}
        <div className="flex flex-col divide-y divide-neutral-100/70">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-4 h-4 rounded bg-neutral-200/70 shrink-0" />
                <div className="w-8 h-8 rounded-full bg-neutral-200/80 shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1 min-w-0 max-w-xs">
                  <div className="h-4 w-28 bg-neutral-200/80 rounded-md" />
                  <div className="h-3 w-48 bg-neutral-200/50 rounded-md" />
                </div>
              </div>
              <div className="h-6 w-16 bg-neutral-100 rounded-full shrink-0" />
              <div className="h-4 w-20 bg-neutral-200/60 rounded-md shrink-0 hidden sm:block" />
              <div className="h-4 w-24 bg-neutral-200/50 rounded-md shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DomainsPageSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-neutral-200/80 rounded-xl" />
        <div className="h-10 w-36 bg-neutral-200/80 rounded-full" />
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 shrink-0" />
              <div className="flex flex-col gap-2 min-w-0">
                <div className="h-4 w-44 bg-neutral-200/80 rounded-md" />
                <div className="h-3 w-32 bg-neutral-200/50 rounded-md" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-7 w-20 bg-neutral-100 rounded-full" />
              <div className="h-8 w-8 bg-neutral-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
