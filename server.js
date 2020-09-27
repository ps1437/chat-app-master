const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
var bodyParser = require("body-parser");

var port = process.env.PORT || 8000;

const rooms = {
  "Random":{ users: {} },
  "Funny":{ users: {} },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: true }));

app.post("/create", (req, res) => {
  if (rooms[req.body.user.roomName]) {
    return res.status(400).json({
      status: "error",
      error: `${req.body.user.roomName} Room is Already exist `,
    });
  }
  rooms[req.body.user.roomName] = { users: {} };
  io.emit("create-room", req.body.user.roomName);
  res.send("Success");
});

app.post("/join", (req, res) => {
  if (!rooms[req.body.user.roomName]) {
    return res.status(400).json({
      status: "error",
      error: `No Room Found with Room Name ${req.body.user.roomName}`,
    });
  }
  io.emit("join", req.body.user.roomName, req.body.user.userName);
  res.send("Success");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  socket.emit("rooms", rooms);

  socket.on("join", (room, username) => {
    socket.join(room);
    rooms[room].users[socket.id] = username;
    io.to(room).emit("user-connected", [...Object.values(rooms[room].users)]);
    socket.to(room).broadcast.emit("new-user-connected", username);
  });

  socket.on("send message", (room, body) => {
    socket.to(room).broadcast.emit("received message", body);
  });

  socket.on("image-share", function (room, msg) {
    socket.to(room).broadcast.emit("image-share-received", msg);
  });

  

  socket.on("disconnect", (roomName, userID) => {
    getUserRooms(socket).forEach((room) => {
      const userName = rooms[room].users[socket.id];
      delete rooms[room].users[socket.id];
      socket
        .to(room)
        .broadcast.emit(
          "user-disconnected",
          [...Object.values(rooms[room].users)],
          userName
        );
    });
  });
});

server.listen(port, () => {
  console.log(`server started at ${port}`);
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}
