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

// A map to store WebSocket connections for each room
const roomConnections: Map<string, Set<WebSocket>> = new Map();

// Function to handle incoming WebSocket connections
function setupWebSocketServer(port: number) {
    const wss = new WebSocketServer({ port });

    wss.on('connection', async (ws, req) => {
        const roomName = getRoomNameFromUrl(req);

        if (!roomName) {
            ws.close(1008, 'Room name is required in the query parameter');
            return;
        }

        // Ensure the room exists
        if (!rooms.has(roomName)) {
            const ydoc = new Y.Doc();

            // Load persisted state from MongoDB
            const roomData = await Room.findOne({ roomId: roomName });
            if (roomData && roomData.ydocState) {
                const state = new Uint8Array(roomData.ydocState.buffer);
                Y.applyUpdate(ydoc, state);
            }

            rooms.set(roomName, ydoc);
            roomConnections.set(roomName, new Set());
        }

        const ydoc = rooms.get(roomName)!;
        const connections = roomConnections.get(roomName)!;

        // Add the connection to the room
        connections.add(ws);

        // Send the current state of the Y.Doc to the new client
        ws.send(Y.encodeStateAsUpdate(ydoc));

        // Handle incoming messages from the client
        ws.on('message', async (message) => {
            try {
                const update = new Uint8Array(message as ArrayBuffer);
                Y.applyUpdate(ydoc, update);

                // Persist the state to MongoDB
                const state = Y.encodeStateAsUpdate(ydoc);
                await Room.updateOne(
                    { roomId: roomName },
                    { $set: { roomId: roomName, ydocState: state } },
                    { upsert: true }
                );

                // Broadcast the update to all other clients in the room
                connections.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(update);
                    }
                });
            } catch (error) {
                console.error('Failed to apply update:', error);
            }
        });

        // Handle client disconnection
        ws.on('close', () => {
            connections.delete(ws);
            if (connections.size === 0) {
                // Optionally clean up the room if no clients are connected
                rooms.delete(roomName);
                roomConnections.delete(roomName);
            }
        });
    });

    console.log(`WebSocket server is running on ws://localhost:${port}`);
}

// Helper function to extract the room name from the URL query parameters
function getRoomNameFromUrl(req: IncomingMessage): string | null {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    return url.searchParams.get('room');
}

// Start the WebSocket server
setupWebSocketServer(8080);