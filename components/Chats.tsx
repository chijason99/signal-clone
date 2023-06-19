import styles from "../src/styles/Chats.module.css";
import { userType } from "@/firebase/database/getConnections";
import Conversation from "./Conversation";
import Header from "./Header";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import getConnections from "@/firebase/database/getConnections";
import { useAuthContext } from "@/context/AuthContext";
import { generateConversationId } from "../lib/chats";
import NewConversationButton from "./NewConversationButton";
import SettingsWrapper from "./SettingsWrapper";
import { useSettingsContext } from "@/context/SettingsContext";

export default function Chats() {
  const [connections, setConnections] = useState<userType[]>([]);
  const { isSettingsOpen } = useSettingsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const fetchedConnections = await getConnections(userId);
        setConnections(fetchedConnections);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (

      <section className={styles.chats}>
        <Header />
        {user && (
          <div
            className={styles["conversations-wrapper"]}
            id="conversations-wrapper"
          >
            {connections.map(({ username, userId }, index) => {
              return (
                <Conversation
                  username={username}
                  userId={userId}
                  key={index}
                  conversationId={generateConversationId(user.uid, userId)}
                />
              );
            })}
          </div>
        )}
        {isSettingsOpen && <SettingsWrapper />}
        <NewConversationButton />
      </section>

  );
}
