import styles from "../src/styles/Header.module.css";
import Image from "next/image";
export default function Header() {
  return (
    <header className={styles.header}>
      <a href="https://signal.org" target="_blank">
        <Image alt="signal-pic" width={50} height={50} src="/signal-icon.png" />
      </a>
      <h1>A Signal Clone</h1>
    </header>
  );
}
