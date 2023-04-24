import styles from "../src/styles/Chats.module.css";
import { DUMMY_DATA } from "../lib/chats";
import Conversation from "./Conversation";
import Header from "./Header";
export default function Chats() {
  return (
      <section className={styles.chats}>
        <Header />
        <div className={styles["conversations-wrapper"]}>
        {DUMMY_DATA.map(({ imageSrc, name, lastSentence }) => {
          return (
            <Conversation
              imageSrc={imageSrc}
              name={name}
              lastSentence={lastSentence}
            />
          );
        })}
        </div>
      </section>
  );
}
