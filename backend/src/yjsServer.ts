import WebSocket, { WebSocketServer } from 'ws';
import * as Y from 'yjs';
import { IncomingMessage } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room'; // Import the Room model

dotenv.config();

// MongoDB setup
const mongoUri = process.env.DATABASE_URL!;
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// A map to store Y.Doc instances for each room
const rooms: Map<string, Y.Doc> = new Map();
const roomConnections: Map<string, Set<WebSocket>> = new Map();
const saveTimers: Map<string, NodeJS.Timeout> = new Map();

function setupWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (ws, req) => {
    const roomName = getRoomNameFromUrl(req);

    if (!roomName) {
      ws.close(1008, 'Room name is required in the query parameter');
      return;
    }

    if (!rooms.has(roomName)) {
      const ydoc = new Y.Doc();

      // Load persisted state from MongoDB
      const roomData = await Room.findOne({ roomId: roomName });
      if (roomData?.ydocState) {
        try {
          const state = new Uint8Array(roomData.ydocState); // ✅ Correct conversion
          Y.applyUpdate(ydoc, state);
          console.log(`State restored for room: ${roomName}`);
        } catch (error) {
          console.error(`Error restoring state for ${roomName}:`, error);
        }
      } else {
        console.log(`No persisted state found for room: ${roomName}`);
      }

      rooms.set(roomName, ydoc);
      roomConnections.set(roomName, new Set());
    }

    const ydoc = rooms.get(roomName)!;
    const connections = roomConnections.get(roomName)!;

    connections.add(ws);

    // Send current document state to new client
    ws.send(Y.encodeStateAsUpdate(ydoc));

    ws.on('message', async (message) => {
      try {
        const update = new Uint8Array(message as ArrayBuffer);
        Y.applyUpdate(ydoc, update);

        // Debounced persistence
        if (saveTimers.has(roomName)) {
          clearTimeout(saveTimers.get(roomName)!);
        }

          saveTimers.set(roomName, setTimeout(async () => {
              const state = Y.encodeStateAsUpdate(ydoc);

              await Room.updateOne(
                  { roomId: roomName },
                  { $set: { roomId: roomName, ydocState: Buffer.from(state) } }, // ✅ Convert Uint8Array to Buffer
                  { upsert: true }
              );

              console.log(`State persisted for room: ${roomName}`);
          }, 2000));


        // Broadcast update to other clients
        connections.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(update);
          }
        });
      } catch (error) {
        console.error('Failed to apply update:', error);
      }
    });

    ws.on('close', () => {
      connections.delete(ws);
      if (connections.size === 0) {
        rooms.delete(roomName);
        roomConnections.delete(roomName);
        saveTimers.delete(roomName);
      }
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

// Extract room name from query
function getRoomNameFromUrl(req: IncomingMessage): string | null {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  console.log(url);
  return url.searchParams.get('room');
}

setupWebSocketServer(8080);
