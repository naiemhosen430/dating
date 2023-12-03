// src/app/api/socket/index.js
import { Server } from "socket.io";

export default async function SocketHandler(req, res) {
  const io = new Server(res.socket.server);

  io.on("connection", (socket) => {
    console.log("A user connected");
    // Handle other Socket.IO events as needed
  });

  // Your API logic for /api/socket
  const response = {
    message: "Socket initialized",
  };

  res.json(response);
}
