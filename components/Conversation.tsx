import Image from "next/image"
import styles from '../src/styles/Conversation.module.css'
import { useConversationContext } from "@/context/ConversationContext"

type conversationProps =  {
  username:string,
  userId:string,
  conversationId: string,
  key:number
}

export default function Conversation({username, userId ,conversationId}:conversationProps) {
  const {setCurrentConversationId, setCurrentConversationReceiverName, setCurrentConversationReceiverId} = useConversationContext()

  function handleReturnConversationId(){
    setCurrentConversationId(conversationId)
    setCurrentConversationReceiverName(username)
    setCurrentConversationReceiverId(userId)
  }
  return (
    <article className={styles["conversation-wrapper"]} onClick={handleReturnConversationId}>
        <div className={styles["pic-wrapper"]}>
        <Image src="/puppy.jpg" height={80} width={80} alt="Profile pic"/>
        </div>
        <div className={styles["details-wrapper"]}>
            <h3>{username}</h3>
        </div>
    </article>
  )
}
