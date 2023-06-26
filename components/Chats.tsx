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
import { Message, generateConversationId } from "../lib/chats";
import { Socket } from "socket.io-client";

interface ChatsProps {
  socket: Socket | null;
}
export default function Chats({ socket }: ChatsProps) {
  const [connections, setConnections] = useState<userType[]>([]);
  const [isNewConversationOpen, setIsNewConversationOpen] =
    useState<boolean>(false);
  const { isSettingsOpen } = useSettingsContext();
  const { user } = useAuthContext();

  console.log(socket)

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

  useEffect(() => {
    if (socket) {
      socket.on("incomingMessage", (msg: Message) => {
        console.log("incoming message!")
        if (!checkIfIncomingMessageFromConnections(connections, msg.senderId)) {
          getConnections(user!.uid).then((fetchedConnections) => {
            console.log(fetchedConnections);
            setConnections(fetchedConnections);
          });
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("incomingMessage");
      }
    };
  }, [socket, connections, user]);

  function handleCloseNewConversationModal() {
    setIsNewConversationOpen(false);
  }

  function handleOpenNewConversationModal() {
    setIsNewConversationOpen(true);
  }

  function checkIfIncomingMessageFromConnections(
    connections: Array<userType>,
    messageSenderId: string
  ) {
    const connectionsCopy = [...connections];
    const result =  connectionsCopy.some((user) => messageSenderId === user.userId);
    console.log(result)
    return result 
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
          <NewConversationForm
            handleCloseNewConversationModal={handleCloseNewConversationModal}
            connections={connections}
            setConnections={setConnections}
          />
        </LeftSideModal>
      )}
      <NewConversationButton
        handleOpenNewConversationModal={handleOpenNewConversationModal}
      />
    </section>
  );
}
