// css
import styles from "../src/styles/Chats.module.css";

//components
import Conversation from "./Conversation";
import Header from "./Header";
import NewConversationButton from "./NewConversationButton";
import SettingsWrapper from "./SettingsWrapper";
import NewConversationForm from "./NewConversationForm";
import LeftSideModal from "./LeftSideModal";

//hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useSettingsContext } from "@/context/SettingsContext";

//firebase functions
import { userType } from "@/firebase/database/getConnections";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import getConnections from "@/firebase/database/getConnections";

//utils
import { generateConversationId } from "../lib/chats";

export default function Chats() {
  const [connections, setConnections] = useState<userType[]>([]);
  const [isNewConversationOpen, setIsNewConversationOpen] =
    useState<boolean>(false);
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

  function handleCloseNewConversationModal(){
    setIsNewConversationOpen(false)
  }

  function handleOpenNewConversationModal(){
    setIsNewConversationOpen(true)
  }

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
      {isNewConversationOpen && (
        <LeftSideModal>
          <NewConversationForm handleCloseNewConversationModal={handleCloseNewConversationModal} connections={connections} />
        </LeftSideModal>
      )}
      <NewConversationButton handleOpenNewConversationModal={handleOpenNewConversationModal} />
    </section>
  );
}
