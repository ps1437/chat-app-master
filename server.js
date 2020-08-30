const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const activeUsers = new Set();
const activeConnections = {};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    activeUsers.add(username);
    activeConnections[socket.id] = username;
    io.emit("user-connected", [...activeUsers]);
  });

  socket.on("send message", (body) => {
    io.emit("received message", body);
  });
 

  // socket.on("disconnect", () => {
  //   delete activeConnections[socket.id];
  //   io.emit("user-disconnected", activeConnections[socket.id]);
  // });
});

server.listen(8000, () => {
  console.log("server started at 8000");
});
