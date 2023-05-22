import styles from "../src/styles/Header.module.css";
import btnStyles from '../src/styles/Button.module.css'
import Image from "next/image";
import signOutFunc from "@/firebase/auth/signOutFunc";
export default function Header() {
  return (
    <header className={styles.header}>
      <a href="https://signal.org" target="_blank">
        <Image alt="signal-pic" width={50} height={50} src="/signal-icon.png" />
      </a>
      <button className={`${btnStyles.btn} ${btnStyles["sign-out"]}`} onClick={() => signOutFunc()}>Sign Out</button>
      <h1 style={{"color":"#3a76f0"}}>SignalClone</h1>
    </header>
  );
}
