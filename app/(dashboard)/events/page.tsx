"use client";

import { useEffect, useState } from "react";
import DataTable, { DataRow } from "@/components/dashboard/DataTable";
import EmptyDomainState from "@/components/dashboard/EmptyDomainState";
import { useDomain } from "@/context/DomainContext";
import { useRealtime } from "@/hooks/useRealtime";
import { api, CustomEventItem } from "@/lib/api";

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
  "bg-emerald-100 text-emerald-700",
  "bg-indigo-100 text-indigo-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-purple-100 text-purple-700",
];

export default function EventsPage() {
  const { currentDomain, isLoading: isDomainLoading } = useDomain();
  const [events, setEvents] = useState<CustomEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { latestEvent, refreshSignal } = useRealtime(currentDomain?.siteId);

  const fetchEvents = async () => {
    if (!currentDomain?.siteId) return;
    try {
      setIsLoading(true);
      const res = await api.dash.getEvents(currentDomain.siteId, "30d", 1, 30);
      if (res?.events) {
        setEvents(res.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentDomain?.siteId, refreshSignal]);

  useEffect(() => {
    if (latestEvent) {
      fetchEvents();
    }
  }, [latestEvent]);

  if (isDomainLoading) {
    return (
      <div className="w-full bg-white rounded-3xl p-16 flex flex-col items-center justify-center gap-4 text-center border border-[#EAE5D9]">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-[#0B63E5] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400 font-light">Loading conversion goals...</span>
      </div>
    );
  }

  if (!currentDomain) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
          Custom conversion goals
        </h1>
        <EmptyDomainState
          title="No domain properties connected"
          description="Connect a domain to track custom goal completions, button clicks, and user conversion funnels."
          actionText="Connect your first domain"
        />
      </div>
    );
  }

  const formatEventDisplayName = (name: string, props?: Record<string, any>): string => {
    if (name === "click") {
      const text = props?.text ? `"${props.text}"` : "Button";
      return `Click: ${text}`;
    }
    if (name === "scroll_depth") {
      return `Scroll Depth ${props?.depth || 0}%`;
    }
    if (name === "screen_resize") {
      return `Screen Resize (${props?.width}×${props?.height})`;
    }
    if (name === "screen_unfocus") {
      return "Screen Unfocus (Tab Blurred)";
    }
    if (name === "screen_focus") {
      return "Screen Focus (Tab Focused)";
    }
    if (name === "outbound_click") {
      return `Outbound: ${props?.text || props?.url || "link"}`;
    }
    return name;
  };

  const formatEventType = (name: string): string => {
    if (name === "click" || name === "outbound_click") return "Interaction";
    if (name === "scroll_depth") return "Scroll Depth";
    if (name.startsWith("screen_")) return "Viewport";
    return "Custom Goal";
  };

  const eventRows: DataRow[] = events.map((ev, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const diffMs = Date.now() - new Date(ev.createdAt).getTime();
    const isRecent = diffMs < 120000;

    return {
      id: `ev-${idx}`,
      name: formatEventDisplayName(ev.name, ev.props),
      avatarColor: color,
      status: isRecent ? "Active" : "Completed",
      type: formatEventType(ev.name),
      email: ev.pathname || "/",
      timestamp: formatTimeAgo(ev.createdAt),
    };
  });

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
          Custom conversion goals
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light">
          Real-time telemetry event triggers captured from {currentDomain.name} ({currentDomain.domain}).
        </p>
      </div>

      <DataTable
        title={isLoading ? "Updating conversion stream..." : "Tracked Event Log"}
        rows={eventRows}
      />
    </div>
  );
}
