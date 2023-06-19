import { useState, useContext } from "react";
import React from "react";
import { ChildrenProps } from "./AuthContext";

type SettingsContextType = {
    isSettingsOpen:boolean,
    setIsSettingsOpen: Function,
    isUpdateModalOpen:boolean,
    setIsUpdateModalOpen: Function,

}

export const SettingsContext =React.createContext<SettingsContextType>({
    isSettingsOpen:false,
    setIsSettingsOpen(){},
    isUpdateModalOpen:false,
    setIsUpdateModalOpen(){}
})

export function useSettingsContext(){
    return useContext(SettingsContext);
} 

export default function SettingsContextProvider({children}:ChildrenProps){
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const contextValue = {
        isSettingsOpen,
        setIsSettingsOpen,
        isUpdateModalOpen,
        setIsUpdateModalOpen
    }
    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    )
}