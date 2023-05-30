import Image from "next/image"
import styles from '../src/styles/Conversation.module.css'
// import { ProfileData } from "../lib/chats"
import { useConversationContext } from "@/context/ConversationContext"

type conversationProps =  {
  username:string,
  conversationId: string,
  key:number
}

export default function Conversation({username, conversationId}:conversationProps) {
  const {setCurrentConversationId, setCurrentConversationUsername} = useConversationContext()

  function handleReturnConversationId(){
    setCurrentConversationId(conversationId)
    setCurrentConversationUsername(username)
  }
  return (
    <article className={styles["conversation-wrapper"]} onClick={handleReturnConversationId}>
        <div className={styles["pic-wrapper"]}>
        <Image src="/puppy.jpg" alt="Profile pic" fill/>
        </div>
        <div className={styles["details-wrapper"]}>
            <h3>{username}</h3>
            {/* <span>
                {lastSentence}
            </span> */}
        </div>
    </article>
  )
}
