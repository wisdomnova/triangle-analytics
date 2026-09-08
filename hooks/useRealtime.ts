"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { api } from "@/lib/api";

export interface TelemetryEvent {
  site_id?: string;
  type?: string;
  pathname?: string;
  country?: string;
  device?: string;
  browser?: string;
  createdAt?: string;
}

export function useRealtime(siteId?: string) {
  const [activeVisitors, setActiveVisitors] = useState<number>(0);
  const [latestEvent, setLatestEvent] = useState<TelemetryEvent | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [refreshSignal, setRefreshSignal] = useState<number>(0);

  useEffect(() => {
    if (!siteId) {
      setActiveVisitors(0);
      return;
    }

    const fetchActiveCount = () => {
      api.dash
        .getRealtimeActive(siteId)
        .then((res) => {
          if (typeof res?.activeVisitors === "number") {
            setActiveVisitors(res.activeVisitors);
          }
        })
        .catch(() => {});
    };

    const triggerFullResync = () => {
      fetchActiveCount();
      setRefreshSignal((prev) => prev + 1);
    };

    // 1. Initial fetch
    fetchActiveCount();

    // 2. Connect to Socket.IO real-time stream
    const socket = getSocket();

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("join:site", siteId);
      triggerFullResync();
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleActiveUpdate = (data: { siteId: string; activeVisitors: number }) => {
      if (data && (!data.siteId || data.siteId === siteId)) {
        setActiveVisitors(data.activeVisitors);
      }
    };

    const handleTelemetryEvent = (event: TelemetryEvent) => {
      setLatestEvent(event);
      triggerFullResync();
    };

    if (socket.connected) {
      setIsConnected(true);
      socket.emit("join:site", siteId);
    } else {
      socket.connect();
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("realtime:active", handleActiveUpdate);
    socket.on("telemetry:event", handleTelemetryEvent);

    // 3. Network reconnection & window refocus triggers
    const handleOnline = () => {
      if (!socket.connected) {
        socket.connect();
      }
      triggerFullResync();
    };

    const handleFocusOrVisibility = () => {
      if (!document.hidden) {
        if (!socket.connected) {
          socket.connect();
        }
        triggerFullResync();
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("focus", handleFocusOrVisibility);
    document.addEventListener("visibilitychange", handleFocusOrVisibility);

    // 4. Fallback 20s polling for background drift sync
    const interval = setInterval(fetchActiveCount, 20000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("focus", handleFocusOrVisibility);
      document.removeEventListener("visibilitychange", handleFocusOrVisibility);
      socket.emit("leave:site", siteId);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("realtime:active", handleActiveUpdate);
      socket.off("telemetry:event", handleTelemetryEvent);
    };
  }, [siteId]);

  return { activeVisitors, latestEvent, isConnected, refreshSignal };
}
