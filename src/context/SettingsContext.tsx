import { useState, useContext } from "react";
import React from "react";
import { ChildrenProps } from "./AuthContext";

type SettingsContextType = {
    isSettingsOpen:boolean,
    setIsSettingsOpen: Function,
    isUpdateFormOpen:boolean,
    setIsUpdateFormOpen: Function,

}

export const SettingsContext =React.createContext<SettingsContextType>({
    isSettingsOpen:false,
    setIsSettingsOpen(){},
    isUpdateFormOpen:false,
    setIsUpdateFormOpen(){}
})

export function useSettingsContext(){
    return useContext(SettingsContext);
} 

export default function SettingsContextProvider({children}:ChildrenProps){
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
    const contextValue = {
        isSettingsOpen,
        setIsSettingsOpen,
        isUpdateFormOpen,
        setIsUpdateFormOpen
    }
    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    )
}