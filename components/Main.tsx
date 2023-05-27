"use client";

import { useRef } from "react";
import styles from "../src/styles/Main.module.css";
import ChatBubble from "./ChatBubble";
import SubmitButton from "./SubmitButton";
import ChatInterfaceHeader from "./ChatInterfaceHeader";
import type { Message } from "../lib/chats";
import { useAuthContext } from "@/context/Context";
interface ChatPersonProps {
  [key: string]: string;
}

interface MainProps {
  messages: Message[];
  handleSendMessage: (msg: Message) => void;
}

export default function Main({ messages, handleSendMessage }: MainProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthContext();
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
    };
    handleSendMessage(msgData);
    inputRef.current.value = "";
  }
  return (
    <div className={styles.wrapper}>
      <ChatInterfaceHeader />
      <div className={styles["fixed-height-container"]}>
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
        />
        <SubmitButton />
      </form>
    </div>
  );
}
