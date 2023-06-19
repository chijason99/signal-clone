import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

export function mapFirebaseErrorCode(errorCode:string){
  switch(errorCode){
    case "auth/invalid-password":
      return "Password provided is not corrected";
    case "auth/invalid-email":
      return "Email provided is invalid";
    case "auth/email-already-in-use":
      return "This new email address is already registered.";
      case "auth/wrong-password":
        return "Invalid credentials."
    default:
      return "An unexpected error occurred."
  }
}