import React from 'react'
import btnStyles from '../src/styles/Button.module.css'
export default function NewConversationButton() {
  return (
    <button className={`${btnStyles.btn} ${btnStyles['new-conversation']}`}>
        &#x2b;
    </button>
  )
}
