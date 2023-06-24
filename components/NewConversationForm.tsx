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

interface NewConversationFormProps {
  handleCloseNewConversationModal: Function;
  connections:Array<userType>
}

export default function NewConversationForm({
  handleCloseNewConversationModal,
  connections
}: NewConversationFormProps) {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>('')
  const {user} = useAuthContext();
  const {setCurrentConversationId, setCurrentConversationReceiverName, setCurrentConversationReceiverId} = useConversationContext()

  function handleStartNewConversation({userId, username}:userType) {
    setCurrentConversationReceiverName(username)
    setCurrentConversationReceiverId(userId)
    const conversationId = generateConversationId(user!.uid, userId )
    setCurrentConversationId(conversationId)
    if(!checkTargetExistInConnections(userId)){
        addNewConnection(user!.uid, userId)
        addNewConversation(conversationId)
    }
  }
  function checkTargetNotCurrentUser(currentUserId:string,targetUserId:string):boolean{
    if(currentUserId === targetUserId){
        setErrorMsg("Target cannot be yourself")
        console.error("Target cannot be yourself")
        return false
    }
    return true
  }
  function checkTargetExistInConnections(targetUserId:string):boolean{
    const connectionsCopy = [...connections]
    for(const currentUser of connectionsCopy){
        if(currentUser.userId === targetUserId){
            console.log(`user ${currentUser.username} is already in the connections. `)
            return true
        }
    }
    return false
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phoneNumberRef?.current?.value.length !== 11) {
        console.log("Invalid phone number")
    }
    const targetPhoneNumber = phoneNumberRef!.current!.value;
    const targetUser = await findUserIdByPhone(targetPhoneNumber)
    if(targetUser != null && checkTargetNotCurrentUser(user!.uid, targetUser.userId)){
        handleStartNewConversation(targetUser.targetUserData as userType)
    }
  }
  return (
    <form
      className={styles["new-conversation-form"]}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles["input-wrapper"]}>
        <label htmlFor="phoneNumber">The phone number of your target: </label>
        <input
          name="phoneNumber"
          id="phoneNumber"
          type="tel"
          placeholder="format: 01234-567890"
          pattern="[0-9]{11}"
          required
          ref={phoneNumberRef}
        />
      </div>
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
