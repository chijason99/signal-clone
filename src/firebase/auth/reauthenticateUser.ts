import { EmailAuthProvider, User, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../config";

export default async function reauthenticateUser(
  email: string,
  password: string
) {
  const credential = EmailAuthProvider.credential(email, password);
 await reauthenticateWithCredential(
    auth.currentUser as User,
    credential
  );
}
