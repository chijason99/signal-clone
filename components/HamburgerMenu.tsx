import styles from "../src/styles/HamburgerMenu.module.css";
import btnStyles from "../src/styles/Button.module.css";
import signOutFunc from "@/firebase/auth/signOutFunc";
import { useState, useEffect, useRef } from "react";
import { useSettingsContext } from "@/context/SettingsContext";

export default function HamburgerMenu() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const hamburgerMenuRef = useRef<HTMLButtonElement>(null);
  const {setIsSettingsOpen} = useSettingsContext();
  useEffect(() => {
    document.addEventListener("click", handelCloseHamburgerMenu);
    return () => {
      document.removeEventListener("click", handelCloseHamburgerMenu);
    };
  }, []);
  function handleClickHamburgerMenu(e: React.SyntheticEvent) {
    e.stopPropagation();
    setIsModalOpen((prevState) => !prevState);
  }
  function handelCloseHamburgerMenu(e: MouseEvent) {
    if (optionsContainerRef.current) {
      setIsModalOpen(false);
    }
  }
  return (
    <div className={`${styles["hamburger-menu-container"]}`}>
      <button
        className={`${styles["hamburger-menu"]} ${btnStyles["btn"]} ${isModalOpen ? styles.active: null}`}
        aria-label="hamburger-menu"
        onClick={(e) => handleClickHamburgerMenu(e)}
        ref={hamburgerMenuRef}
        type="button"
      >
        <span className={`${styles.lines} ${styles.line1}`}></span>
        <span className={`${styles.lines} ${styles.line2}`}></span>
        <span className={`${styles.lines} ${styles.line3}`}></span>
      </button>
      {isModalOpen && (
        <div ref={optionsContainerRef}>
          <ul className={styles["options-container"]}>
            <li className={styles["option"]}>
              <button className={`${btnStyles["option-btn"]} ${btnStyles["btn"]}`} onClick={() => setIsSettingsOpen(true)}>Settings</button>
            </li>
            <li className={styles["option"]}>
              <button className={`${btnStyles["option-btn"]} ${btnStyles["btn"]}`} onClick={() => signOutFunc()}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
