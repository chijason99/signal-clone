import { database } from "../config";
import { getDoc, doc } from "firebase/firestore";
import { Message } from "../../../lib/chats";
export default async function loadMessage(conversationId: string) {
  let messages: Array<Message> = [];
  const messagesRef = doc(database, "conversations", conversationId);
  try {
    let messageSnap = await getDoc(messagesRef);
    if (messageSnap.exists()) {
      const { messages: previousMessages } = messageSnap.data();
      messages = previousMessages;
    }
  } catch (error) {
    console.error(error);
  }
  return messages;
}
