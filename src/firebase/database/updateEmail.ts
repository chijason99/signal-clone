import { auth, database } from "../config";
import { User, updateEmail as firebaseUpdateEmail } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";


export default async function updateEmail(newEmail:string, userId:string){
        const currentUser = auth.currentUser
        const userRef = doc(database, 'users', userId)
        await firebaseUpdateEmail(currentUser as User, newEmail)
        await updateDoc(userRef, {email:newEmail})
}




