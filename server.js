const express = require("express");
const http = require("http");
const app = express();
const { v4: uuidv4 } = require('uuid');

const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const rooms ={}


io.on("connection", socket => {
    socket.emit("loginID", uuidv4());
    socket.on("send message", body => {
        io.emit("message", body)
    });
    socket.on("login", body => {
        io.emit("user", body)
    })
})


server.listen(8000,()=>{
    console.log("server started at 8000")
})