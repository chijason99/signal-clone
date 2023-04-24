import styles from '../src/styles/ChatBubble.module.css'
interface ChatBubble{
    msg:string,
    time:string,
    fromOthers:boolean
}


export default function ChatBubble({msg,time,fromOthers}:ChatBubble) {

  return (
    <div className={`${styles["chat-bubble-wrapper"]} ${fromOthers?styles['left']:styles['right']}`}>
        <span className={styles.message}>{msg}</span>
        <span className={styles.time}>{time}</span>
    </div>
  )
}
