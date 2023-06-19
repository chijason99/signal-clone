import { database } from "../config";
import { updateDoc, doc } from "firebase/firestore";

export default async function updateUsername(userId:string, newUsername:string){
    const userRef = doc(database, 'users', userId)
    await updateDoc(userRef, {username:newUsername})

}