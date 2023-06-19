import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/context/AuthContext";
import ConversationContextProvider from "@/context/ConversationContext";
import SettingsContextProvider from "@/context/SettingsContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <ConversationContextProvider>
          <SettingsContextProvider>
            <Component {...pageProps} />
          </SettingsContextProvider>
        </ConversationContextProvider>
      </AuthContextProvider>
    </>
  );
}
