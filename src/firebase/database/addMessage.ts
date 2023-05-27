import { database } from "../config";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { Message } from "../../../lib/chats";

export default async function addMessage(conversationId:string, data:Message){
    const conversationRef = doc(database, "conversations", conversationId)
    try{
        await updateDoc(conversationRef, {messages: arrayUnion(data)})
    }catch(error){
        console.error(error)
    }
}