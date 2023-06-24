import { database } from "@/firebase/config";
import { getDoc, doc, DocumentReference } from "firebase/firestore";

export interface UserProfileType{
    username:string,
    email: string,
    userId:string,
    connections:Array<DocumentReference>,
    phoneNumber:string
}


export default async function getUserProfile(userId: string) {
    try{
        const userRef = doc(database, 'users', userId)
        const userSnapshot = await getDoc(userRef);
        const {username, email} = userSnapshot.data() as UserProfileType
        return {username, email}
    }catch(error){
        console.error(error)
        throw error
    }
}
