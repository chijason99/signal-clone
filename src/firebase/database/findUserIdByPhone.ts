import { database } from "../config";
import { getDoc, doc, DocumentReference } from "firebase/firestore";

interface PhoneNumberDocType {
  userId: string;
  user: DocumentReference;
}

export default async function findUserIdByPhone(phone: string) {
  try {
    const userRef = doc(database, "phoneNumber", phone);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      throw new Error("Phone number not found");
    }
    const { userId, user } = userSnapshot.data() as PhoneNumberDocType;
    const targetUser = await getDoc(user);

    return { userId, targetUserData: targetUser.data(), success: true };
  } catch (error) {
    console.error(error);
    return {  userId: null, targetUserData: null, success: false };
  }
}
