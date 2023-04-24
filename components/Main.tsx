import React from "react";
import styles from "../src/styles/Main.module.css";
import { CHAT_DUMMY_DATA } from "../lib/chats";
import ChatBubble from "./ChatBubble";
import SubmitButton from "./SubmitButton";
import ChatInterfaceHeader from "./ChatInterfaceHeader";
interface ChatPerson {
  name: keyof typeof CHAT_DUMMY_DATA;
}

export default function Main({ name }: ChatPerson) {
  function handleSendMessage(e:React.SyntheticEvent){
    e.preventDefault();
  }

  return (
    <div className={styles.wrapper}>
      <ChatInterfaceHeader />
      <div className={styles["fixed-height-container"]}>
        <main className={styles["chat-bubbles-wrapper"]}>
          {CHAT_DUMMY_DATA[name].map(({ msg, time, fromOthers },index) => {
            return <ChatBubble key={index} msg={msg} time={time} fromOthers={fromOthers} />;
          })}
        </main>
      </div>
      <form action="" className={styles.form} onSubmit={e => {handleSendMessage(e)}}>
        <input type="text" placeholder="Write your message here" />
        <SubmitButton />
      </form>
    </div>
  );
}
