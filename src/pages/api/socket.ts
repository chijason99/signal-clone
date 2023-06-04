import { Server as IOServer, Socket } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server as HTTPServer } from "http";

interface CustomSocket extends Socket{
  userId?:string
}

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default  function SocketHandler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log(`The socket is already connected`);
    res.end();
    return;
  }
  const io = new IOServer(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;
  io.use((socket:CustomSocket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error(`invalid userId: ${userId}`));
    }
    socket.userId = userId;
    next();
  });
  io.on("connection", (socket:CustomSocket) => {
    console.log(`New user ${socket.id} connects to the socket`);
    console.log(`userId: ${socket.userId}`)
    socket.on("sendMessage", (msg) => {
      console.log("message incoming", msg);
      // socket.broadcast.emit("incomingMessage", msg);
      socket.to(msg.receiverId).emit("incomingMessage", msg)
    });
    socket.on("disconnect", () => {
      console.log(`user ${socket.id} disconnected.`);
    });
  });
  io.on("error", (error) => {
    console.error(`Socket server error: ${error}`);
  });
  console.log(`setting up the socket`);
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
