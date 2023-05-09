import { Server as IOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server as HTTPServer } from "http";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default function SocketHandler(
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
  io.on("connection", (socket) => {
    console.log(`New user connected to the socket${socket.id}`);
    socket.on("sendMessage", (msg) => {
      console.log('message incoming', msg)
      socket.broadcast.emit("incomingMessage", msg);
      // socket.broadcast.emit(msg);
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
