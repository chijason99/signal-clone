import { database } from "../config";
import { setDoc, doc } from "firebase/firestore";


export default async function addNewConversation(conversationId:string){
    try{
        const conversationData = {messages:[]}
        await setDoc(doc(database, "conversations",conversationId), conversationData )
    }catch(error){
        console.error(error)
    }
}