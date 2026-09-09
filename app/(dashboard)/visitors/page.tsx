"use client";

import { useEffect, useState } from "react";
import DataTable, { DataRow } from "@/components/dashboard/DataTable";
import EmptyDomainState from "@/components/dashboard/EmptyDomainState";
import { useDomain } from "@/context/DomainContext";
import { useRealtime } from "@/hooks/useRealtime";
import { api, VisitorSession } from "@/lib/api";

function formatTimeAgo(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  } catch {
    return "Recently";
  }
}

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

export default function VisitorsPage() {
  const { currentDomain, isLoading: isDomainLoading } = useDomain();
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { activeVisitors, latestEvent, refreshSignal } = useRealtime(currentDomain?.siteId);

  const fetchVisitors = async () => {
    if (!currentDomain?.siteId) return;
    try {
      setIsLoading(true);
      const res = await api.dash.getVisitors(currentDomain.siteId, "30d", 1, 30);
      if (res?.sessions) {
        setSessions(res.sessions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [currentDomain?.siteId, refreshSignal]);

  // Refetch or prepend when a new telemetry event arrives
  useEffect(() => {
    if (latestEvent) {
      fetchVisitors();
    }
  }, [latestEvent]);

  if (isDomainLoading) {
    return (
      <div className="w-full bg-white rounded-3xl p-16 flex flex-col items-center justify-center gap-4 text-center border border-[#EAE5D9]">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-[#0B63E5] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400 font-light">Loading visitor sessions...</span>
      </div>
    );
  }

  if (!currentDomain) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
          Live visitor sessions
        </h1>
        <EmptyDomainState
          title="No domain properties connected"
          description="Register your domain to capture live visitor streams, session timelines, and device fingerprints."
          actionText="Connect your first domain"
        />
      </div>
    );
  }

  const getSessionStatus = (lastSeenIso: string, isOnline: boolean): "Active" | "Idle" | "Completed" => {
    try {
      const diffMs = Date.now() - new Date(lastSeenIso).getTime();
      const diffMinutes = diffMs / 60000;
      if (isOnline || diffMinutes < 1.5) return "Active";
      if (diffMinutes < 15) return "Idle";
      return "Completed";
    } catch {
      return "Completed";
    }
  };

  const visitorRows: DataRow[] = sessions.map((s, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const isOnline = idx < activeVisitors;
    const computedStatus = getSessionStatus(s.lastSeen, isOnline);
    const hardware = s.deviceModel ? `${s.deviceModel} · ` : "";
    const network = s.carrier ? ` · ${s.carrier}` : "";

    return {
      id: s.sessionId || `v-${idx}`,
      name: `Visitor ${s.visitorId.substring(0, 6)}`,
      avatarColor: color,
      status: computedStatus,
      type: `${s.entryPage} (${s.pagesViewed} pages)`,
      email: `${hardware}${s.browser} on ${s.os || "Mac"} (${s.country && s.country !== "Unknown" ? s.country : "Global"}${network})`,
      timestamp: formatTimeAgo(s.lastSeen),
    };
  });

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
            Live visitor sessions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Real-time, privacy-preserving session timeline for {currentDomain.name} ({currentDomain.domain}).
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white border border-[#EAE5D9] rounded-xl px-4 h-10 text-xs font-medium text-neutral-900 select-none">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeVisitors} online right now</span>
        </div>
      </div>

      <DataTable
        title={isLoading ? "Updating visitor log..." : "Recent Visitor Stream"}
        rows={visitorRows}
      />
    </div>
  );
}
