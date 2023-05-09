import Image from "next/image"
import styles from '../src/styles/Conversation.module.css'
import { ProfileData } from "../lib/chats"
export default function Conversation({imageSrc, name, lastSentence}: ProfileData) {
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
