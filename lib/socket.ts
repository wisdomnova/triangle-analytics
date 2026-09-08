import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./api";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
      console.log("[socket] Connected to real-time telemetry stream:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] Disconnected:", reason);
    });

    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        if (socket && !socket.connected) {
          socket.connect();
        }
      });

      window.addEventListener("focus", () => {
        if (socket && !socket.connected) {
          socket.connect();
        }
      });
    }
  }

  return socket;
}
