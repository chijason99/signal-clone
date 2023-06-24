import { database } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";

export type userType = {
  email: string;
  connections: string[];
  username: string;
  userId: string;
  phoneNumber:string;
};

export default async function getConnections(
  userId: string
): Promise<userType[]> {
  try {
    const userRef = doc(database, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) return [];
    const userData: DocumentReference[] = userSnapshot.get("connections");
    const connections: userType[] = [];
    if (userData.length == 0) {
      return connections;
    }
    await Promise.all(
      userData.map(async (userRef: DocumentReference) => {
        const fetchedPerson = await getDoc(userRef);
        const user = fetchedPerson.data() as userType;
        connections.push(user);
      })
    );
    return connections;
  } catch (error) {
    console.error(error);
    return [];
  }
}
