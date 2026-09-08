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

  useEffect(() => {
    if (!siteId) {
      setActiveVisitors(0);
      return;
    }

    // 1. Fetch initial active visitor count
    api.dash
      .getRealtimeActive(siteId)
      .then((res) => {
        if (typeof res?.activeVisitors === "number") {
          setActiveVisitors(res.activeVisitors);
        }
      })
      .catch(() => {});

    // 2. Connect to Socket.IO real-time stream
    const socket = getSocket();

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("join:site", siteId);
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
    };

    if (socket.connected) {
      setIsConnected(true);
      socket.emit("join:site", siteId);
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("realtime:active", handleActiveUpdate);
    socket.on("telemetry:event", handleTelemetryEvent);

    // 3. Fallback 20s polling for background drift sync
    const interval = setInterval(() => {
      api.dash
        .getRealtimeActive(siteId)
        .then((res) => {
          if (typeof res?.activeVisitors === "number") {
            setActiveVisitors(res.activeVisitors);
          }
        })
        .catch(() => {});
    }, 20000);

    return () => {
      clearInterval(interval);
      socket.emit("leave:site", siteId);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("realtime:active", handleActiveUpdate);
      socket.off("telemetry:event", handleTelemetryEvent);
    };
  }, [siteId]);

  return { activeVisitors, latestEvent, isConnected };
}
