//hooks
import React, { FormEvent, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useConversationContext } from "@/context/ConversationContext";

//css
import styles from "../src/styles/NewConversationForm.module.css";
import btnStyles from "../src/styles/Button.module.css";

//firebase functions
import findUserIdByPhone from "@/firebase/database/findUserIdByPhone";
import { userType } from "@/firebase/database/getConnections";
import { generateConversationId } from "../lib/chats";
import addNewConnection from "@/firebase/database/addNewConnection";
import addNewConversation from "@/firebase/database/addNewConversation";

// utils
import { checkPhoneNumberLength } from "../lib/chats";

// components
import PhoneNumberInput from "./PhoneNumberInput";

interface NewConversationFormProps {
  handleCloseNewConversationModal: Function;
  connections: Array<userType>;
  setConnections: Function;
}

export default function NewConversationForm({
  handleCloseNewConversationModal,
  connections,
  setConnections,
}: NewConversationFormProps) {
  const phoneNumberRef1 = useRef<HTMLInputElement>(null);
  const phoneNumberRef2 = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { user } = useAuthContext();
  const {
    setCurrentConversationId,
    setCurrentConversationReceiverName,
    setCurrentConversationReceiverId,
  } = useConversationContext();

  function handleStartNewConversation(targetUser: userType) {
    const { username, userId } = targetUser;
    setCurrentConversationReceiverName(username);
    setCurrentConversationReceiverId(userId);
    const conversationId = generateConversationId(user!.uid, userId);
    setCurrentConversationId(conversationId);
    if (!checkTargetExistInConnections(userId)) {
      addNewConnection(user!.uid, userId);
      addNewConversation(conversationId);
      setConnections((prev: Array<userType>) => [...prev, targetUser]);
    }
  }

  function checkTargetNotCurrentUser(
    currentUserId: string,
    targetUserId: string
  ): boolean {
    if (currentUserId === targetUserId) {
      setErrorMsg("Target cannot be yourself");
      console.error("Target cannot be yourself");
      return false;
    }
    return true;
  }

  function checkTargetExistInConnections(targetUserId: string): boolean {
    const connectionsCopy = [...connections];
    for (const currentUser of connectionsCopy) {
      if (currentUser.userId === targetUserId) {
        console.log(
          `user ${currentUser.username} is already in the connections. `
        );
        return true;
      }
    }
    return false;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !checkPhoneNumberLength(phoneNumberRef1!.current!.value, 5) ||
      !checkPhoneNumberLength(phoneNumberRef2!.current!.value, 6)
    ) {
      setErrorMsg("Invalid phone number");
      return;
    }
    const targetPhoneNumber =
      phoneNumberRef1!.current!.value + phoneNumberRef2!.current!.value;
    const { success, targetUserData, userId } = await findUserIdByPhone(
      targetPhoneNumber
    );
    if (success && checkTargetNotCurrentUser(user!.uid, userId as string)) {
      handleStartNewConversation(targetUserData as userType);
      handleCloseNewConversationModal();
      return;
    } else {
      setErrorMsg("Cannot find users with entered phone number");
      return;
    }
  }

  return (
    <form
      className={styles["new-conversation-form"]}
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      <PhoneNumberInput
        phoneNumberRef1={phoneNumberRef1}
        phoneNumberRef2={phoneNumberRef2}
        isSignUp={false}
      />
      <div className={styles["btn-wrapper"]}>
        <button
          className={`${btnStyles.btn} ${btnStyles.submit}`}
          type="submit"
        >
          Find
        </button>
        <button
          className={`${btnStyles.btn} ${btnStyles.cancel}`}
          onClick={() => handleCloseNewConversationModal()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
