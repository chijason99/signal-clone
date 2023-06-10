import styles from "../src/styles/Header.module.css";
import btnStyles from '../src/styles/Button.module.css'
import Image from "next/image";
import signOutFunc from "@/firebase/auth/signOutFunc";
import HamburgerMenu from "./HamburgerMenu";
export default function Header() {
  return (
    <header className={styles.header}>
      <a href="https://signal.org" target="_blank">
        <Image alt="signal-pic" width={50} height={50} src="/signal-icon.png" />
      </a>
      <h1 style={{"color":"#3a76f0"}} data-cy="h1">SignalClone</h1>
      {/* <button className={`${btnStyles.btn} ${btnStyles["auth"]}`} data-cy="sign-out-btn" onClick={() => signOutFunc()}>Sign Out</button> */}
      <HamburgerMenu />
    </header>
  );
}
