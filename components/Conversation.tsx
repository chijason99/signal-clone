import Image from "next/image"
import styles from '../src/styles/Conversation.module.css'
type ConversationProps = {
    imageSrc:string,
    name: string,
    lastSentence: string
}

export default function Conversation({imageSrc, name, lastSentence}: ConversationProps) {
  return (
    <article className={styles["conversation-wrapper"]}>
        <div className={styles["pic-wrapper"]}>
        <Image src={imageSrc} alt="Profile pic" fill/>
        </div>
        <div className={styles["details-wrapper"]}>
            <h3>{name}</h3>
            <span>
                {lastSentence}
            </span>
        </div>
    </article>
  )
}
