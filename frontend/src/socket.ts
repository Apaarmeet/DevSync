import { io, Socket } from "socket.io-client";

export function createSocket(roomId: string): Socket {
  return io(import.meta.env.VITE_BACKEND_SOCKET, {
    query: { roomId },
  });
}

