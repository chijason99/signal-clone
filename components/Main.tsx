"use client";

// hooks
import { useRef, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

// css
import styles from "../src/styles/Main.module.css";

// components
import ChatBubble from "./ChatBubble";
import SubmitButton from "./SubmitButton";
import ChatInterfaceHeader from "./ChatInterfaceHeader";

// utils
import type { Message } from "../lib/chats";

interface MainProps {
  messages: Message[];
  handleSendMessage: (msg: Message) => void;
}

export default function Main({ messages, handleSendMessage }: MainProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null) 
  const { user } = useAuthContext();

  useEffect(() => {
    if(messagesContainerRef.current){
      const messagesContainer = messagesContainerRef.current;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!inputRef.current) return;
    if (inputRef.current.value.trim() == "") return;
    const sentTime = new Date();
    const msgData = {
      msg: inputRef.current.value,
      time: `${sentTime.getHours()}:${
        (sentTime.getMinutes() < 10 ? "0" : "") + sentTime.getMinutes()
      }`,
      senderId: user!.uid,
      receiverId:""
    };
    handleSendMessage(msgData);
    inputRef.current.value = "";
  }

  return (
    <div className={styles.wrapper}>
      <ChatInterfaceHeader />
      <div className={styles["fixed-height-container"]}  ref={messagesContainerRef}>
        <main className={styles["chat-bubbles-wrapper"]}>
          {messages.map(({ msg, time, senderId }, index) => {
            return (
              <ChatBubble
                key={index}
                msg={msg}
                time={time}
                fromOthers={senderId !== user?.uid}
              />
            );
          })}
        </main>
      </div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Write your message here"
          ref={inputRef}
          data-cy="msg-input"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
