const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Actions = require("./src/Actions");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};

const getAllConectedClients = (roomId) => {
  //map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {

  console.log("Socket Connected", socket.id);

  socket.on(Actions.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on('disconnecting',()=>{
    const rooms=[...socket.rooms];
    rooms.forEach((roomId)=>{
      socket.in(roomId).emit(Actions.DISCONNECTED,{
        socketId:socket.id,
        username:userSocketMap[socket.id]
      })
    });
    delete userSocketMap[socket.id];
    socket.leave();
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
