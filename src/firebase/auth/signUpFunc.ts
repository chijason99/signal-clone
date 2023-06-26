import { auth, database } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default async function signUpFunc(email: string, password: string, username:string, phoneNumber:string) {
  let result = null, error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(database, "users", result.user.uid), {
      email:result.user.email,
      username: username,
      userId:result.user.uid,
      connections:[],
      phoneNumber
    })
    const newUserRef = await doc(database,"users",result.user.uid)
    await setDoc(doc(database,"phoneNumber",phoneNumber), {
      userId:result.user.uid,
      user:newUserRef

    })
  } catch (errorMessage) {
    error = errorMessage
  }
  return { result, error };
}
