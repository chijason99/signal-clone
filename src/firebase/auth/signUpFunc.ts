import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUpFunc(email: string, password: string) {
  let result = null, error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (errorMessage) {
    error = errorMessage
  }
  return { result, error };
}
