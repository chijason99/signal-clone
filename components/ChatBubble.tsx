import styles from '../src/styles/ChatBubble.module.css'
interface ChatBubble{
    msg:string,
    time:string,
    fromOthers:boolean
    dataCyValue?:string
}


export default function ChatBubble({msg,time,fromOthers, dataCyValue}:ChatBubble) {

  return (
    <div data-cy={dataCyValue} className={`${styles["chat-bubble-wrapper"]} ${fromOthers?styles['left']:styles['right']}`}>
        <span data-cy="msg" className={styles.message}>{msg}</span>
        <span data-cy="time"className={styles.time}>{time}</span>
    </div>
  )
}
