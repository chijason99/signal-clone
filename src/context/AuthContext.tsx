import { onAuthStateChanged } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "@/firebase/config";
import { useEffect, createContext, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";

export type AuthContextType = {
  user: FirebaseUser | null;
};
export const AuthContext = createContext<AuthContextType>({ user: null });

export function useAuthContext(){
    return useContext(AuthContext)
}
type ChildrenProps = {
  children: React.ReactNode;
};

export default function AuthContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
}
