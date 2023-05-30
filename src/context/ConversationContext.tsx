import React from 'react'
import { useState, useContext } from 'react';
type ChildrenProps = {
    children: React.ReactNode;
  };

type ConversationContextType = {
    currentConversationId:string,
    setCurrentConversationId: Function,
    currentConversationUsername:string,
    setCurrentConversationUsername: Function
}

export const ConversationContext = React.createContext<ConversationContextType>({
    currentConversationId:"8kt0g7rLl5RFocv1W1OtcLP1f7l2rxhdfKUm6nhFMGF3u6qxGtq2DTb2",
    setCurrentConversationId(){},
    currentConversationUsername:'',
    setCurrentConversationUsername(){}
})

export function useConversationContext(){
    return useContext(ConversationContext)
}

export default function ConversationContextProvider({children}:ChildrenProps){
    const [currentConversationId, setCurrentConversationId ] = useState('')
    const [currentConversationUsername, setCurrentConversationUsername ] = useState('')

    const contextValue = {
        currentConversationId,
        setCurrentConversationId,
        currentConversationUsername,
        setCurrentConversationUsername
    }
    return(
        <ConversationContext.Provider value={contextValue} >
            {children}
        </ConversationContext.Provider>
    )
}