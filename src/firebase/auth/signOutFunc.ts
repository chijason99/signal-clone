import { auth } from "../config";
import { signOut } from "firebase/auth";

export default async function signOutFunc(){
    try {
      await signOut(auth);
    } catch (errorMessage) {
      console.error(errorMessage)
    }
}