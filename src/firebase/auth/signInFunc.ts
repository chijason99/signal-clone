import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signInFunc(email:string, password:string){
    let result = null, error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (errorMessage) {
      error = errorMessage
    }
    return { result, error };
}