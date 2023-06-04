import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Chats from "../../components/Chats";
import Main from "../../components/Main";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useConversationContext } from "@/context/ConversationContext";
import addMessage from "@/firebase/database/addMessage";
import loadMessage from "@/firebase/database/loadMessage";
import io, { Socket } from "socket.io-client";
import type { Message } from "../../lib/chats";
import LandingPage from "./LandingPage";

interface ServerToClientEvents {
  incomingMessage: (msg: Message) => void;
}

interface ClientToServerEvents {
  sendMessage: (msg: Message) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export default function Home() {
  const [message, setMessage] = useState<Array<Message>>([]);
  const { currentConversationId, currentConversationReceiverId } = useConversationContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      handleSocketInitialize();
    } else {
      setIsLoggedIn(false);
    }
    return () => {
      if (socket && !isLoggedIn) {
        socket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    async function getPreviousMessages() {
      if (currentConversationId) {
        const previousMessages = await loadMessage(currentConversationId);
        setMessage(previousMessages);
      }
    }
    getPreviousMessages();
  }, [currentConversationId]);

  async function handleSocketInitialize() {
    await fetch("/api/socket");
    socket = io({ path: "/api/socket", autoConnect: false });
    if (user) {
      socket.auth = { userId: user.uid };
      socket.connect();
      socket.on("connect", () => {
        // socket.removeAllListeners();
        console.log(`connected! socketID:${socket.id}`);
      });
      socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
      });
      socket.on("incomingMessage", (msg: Message) => {
        setMessage((previousMessages) => [...previousMessages, msg]);
      });
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });
    }
  }
  function handleSendMessage(msg: Message) {
    if (currentConversationId && currentConversationReceiverId) {
      socket.emit("sendMessage", { ...msg, senderId: user!.uid });
      addMessage(currentConversationId, {
        ...msg,
        senderId: user!.uid,
        receiverId: currentConversationReceiverId
      });
    }
  }
  return (
    <>
      <Head>
        <title>Real time chat app</title>
        <meta
          name="description"
          content="A real time chat app developed with Next.js and socket.io."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoggedIn && (
        <div className={styles.wrapper}>
          <Chats />
          {currentConversationId && (
            <Main handleSendMessage={handleSendMessage} messages={message} />
          )}
        </div>
      )}
      {!isLoggedIn && <LandingPage />}
    </>
  );
}
