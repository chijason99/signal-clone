import { User, updatePassword as firebaseUpdatePassword } from "firebase/auth";
import { auth } from "../config";
export default async function updatePassword(newPassword:string){
    return await firebaseUpdatePassword(auth.currentUser as User, newPassword)
}