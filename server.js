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

  socket.on("base64 file", function (msg) {
    io.sockets.emit(
      "base64 file",
      {
        body: msg.file.toString("base64"),
        id: msg.id,
        type: "IMG",
        fileName: msg.fileName,
      }
    );
  });


});

server.listen(8000, () => {
  console.log("server started at 8000");
});
