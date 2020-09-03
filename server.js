const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
var port = process.env.PORT || 8000;

const activeUsers = new Set();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.userId = username;
    activeUsers.add(username);
    io.emit("user-connected", [...activeUsers]);
    socket.broadcast.emit("new-user-connected", username);
  });

  socket.on("send message", (body) => {
    io.emit("received message", body);
  });

  socket.on("image-share", function (msg) {
    io.sockets.emit("image-share-received", {
      body: msg.file.toString("base64"),
      id: msg.id,
      type: "IMG",
      fileName: msg.fileName,
    });
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user-disconnected", socket.userId, [...activeUsers]);
  });
});

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
