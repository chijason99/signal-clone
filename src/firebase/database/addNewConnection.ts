import { database } from "../config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";


export default async function addNewConnection(currentUserId:string, targetUserId:string){
    try{
        const currentUserRef = doc(database, "users", currentUserId)
        const targetUserRef = doc(database, "users", targetUserId)
        await updateDoc(currentUserRef,{connections: arrayUnion(targetUserRef)})
        await updateDoc(targetUserRef,{connections: arrayUnion(currentUserRef)})
        console.log('collections updated successfully')
    }catch(error){
        console.error(error)
    }

}