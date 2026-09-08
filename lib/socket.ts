import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./api";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("[socket] Connected to real-time telemetry stream:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] Disconnected:", reason);
    });
  }

  return socket;
}
