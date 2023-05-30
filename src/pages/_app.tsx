import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/context/AuthContext";
import ConversationContextProvider from "@/context/ConversationContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <ConversationContextProvider>
          <Component {...pageProps} />
        </ConversationContextProvider>
      </AuthContextProvider>
    </>
  );
}
