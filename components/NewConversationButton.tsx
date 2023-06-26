import btnStyles from '../src/styles/Button.module.css'

interface NewConversationButtonProps{
  handleOpenNewConversationModal:Function,
}

export default function NewConversationButton({handleOpenNewConversationModal}:NewConversationButtonProps) {
  return (
    <button className={`${btnStyles.btn} ${btnStyles['new-conversation']}`} onClick={() => handleOpenNewConversationModal()}>
        &#x2b;
    </button>
  )
}
