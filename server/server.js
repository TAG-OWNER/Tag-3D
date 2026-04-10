// ===============================
// BACKEND — Node.js + Socket.io
// Bestand: server/server.js
// ===============================

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    rooms[room] = rooms[room] || { players: [] };
    rooms[room].players.push({ id: socket.id, x: 100, y: 220 });
    io.to(room).emit("room-update", rooms[room]);
  });

  socket.on("input", ({ room, input }) => {
    // authoritative physics would live here
    socket.to(room).emit("state", input);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(p => p.id !== socket.id);
      io.to(room).emit("room-update", rooms[room]);
    }
  });
});

server.listen(3001, () => console.log("✅ Arcade server running on :3001"));
