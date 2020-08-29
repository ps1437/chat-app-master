const express = require("express");
const http = require("http");
const app = express();
const { v4: uuidv4 } = require("uuid");

const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const activeUsers = new Set();

io.on("connection", (socket) => {
  socket.emit("join", uuidv4());
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
  socket.on("login", (body) => {
    socket.userId = uuidv4();
    activeUsers.add(body);
    io.emit("user", [...activeUsers]);
  });

//   socket.on("disconnect", () => {
//     activeUsers.delete(socket.userId);
//     io.emit("user disconnected", socket.userId);
//   });
});

server.listen(8000, () => {
  console.log("server started at 8000");
});
