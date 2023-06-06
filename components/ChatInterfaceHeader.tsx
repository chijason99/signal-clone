import Image from "next/image"
import styles from '../src/styles/Chat-interface-header.module.css'
import { useConversationContext } from "@/context/ConversationContext";

export default function ChatInterfaceHeader() {
  const {currentConversationReceiverName} = useConversationContext()
  return (
    <section className={styles["chat-interface-header"]}>
        <Image height={50} width={50} alt="Profile pic" src='/puppy.jpg' className={styles["profile-pic"]} data-cy="profile-pic"/>
        <span className={styles.name} data-cy="username">{currentConversationReceiverName}</span>
    </section>
  )
}
