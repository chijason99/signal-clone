import React from 'react'
import { useState, useContext } from 'react';
type ChildrenProps = {
    children: React.ReactNode;
  };

type ConversationContextType = {
    currentConversationId:string | undefined,
    setCurrentConversationId: Function,
    currentConversationReceiverName:string | undefined,
    setCurrentConversationReceiverName: Function,
    currentConversationReceiverId:string | undefined,
    setCurrentConversationReceiverId: Function
}

export const ConversationContext = React.createContext<ConversationContextType>({
    currentConversationId:'',
    setCurrentConversationId(){},
    currentConversationReceiverName:'',
    setCurrentConversationReceiverName(){},
    currentConversationReceiverId:'',
    setCurrentConversationReceiverId(){}
})

export function useConversationContext(){
    return useContext(ConversationContext)
}

export default function ConversationContextProvider({children}:ChildrenProps){
    const [currentConversationId, setCurrentConversationId ] = useState('')
    const [currentConversationReceiverName, setCurrentConversationReceiverName ] = useState('')
    const [currentConversationReceiverId, setCurrentConversationReceiverId ] = useState('')

    const contextValue = {
        currentConversationId,
        setCurrentConversationId,
        currentConversationReceiverName,
        setCurrentConversationReceiverName,
        currentConversationReceiverId,
        setCurrentConversationReceiverId
    }
    return(
        <ConversationContext.Provider value={contextValue} >
            {children}
        </ConversationContext.Provider>
    )
}