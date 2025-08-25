import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Get roomId from query params
  const roomId = socket.handshake.query.roomId as string;
  if (roomId) {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  } else {
    console.log("No roomId provided in query params");
  }

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-change", code);
  });
});


server.listen(process.env.PORT, () => console.log(`Server`));