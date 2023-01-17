const { Server } = require("socket.io");
const express = require("express");
const app = express(); //instance of express
const http = require("http");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    // socket.emit("receive_message", data);
    // socket.broadcast.emit("receive_message", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3005, () => console.log("Server was started on port 3005"));