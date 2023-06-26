// hooks
import { useSettingsContext } from "@/context/SettingsContext";
import {useEffect, useState } from "react";

// css
import styles from "../src/styles/SettingsWrapper.module.css";
import btnStyles from "../src/styles/Button.module.css";

// components
import Settings from "./Settings";

export default function SettingsWrapper() {
  const { setIsSettingsOpen } = useSettingsContext();
  const [isMounting, setIsMounting] = useState<boolean>(false);

  useEffect(() => {
    setIsMounting(true);
  }, []);

  function handleCloseSettings() {
    setIsMounting(false);
    setTimeout(() => setIsSettingsOpen(false), 500);
  }
  
  return (
    <div
      className={`${styles["settings-container"]} ${
        isMounting ? styles.visible : styles.hidden
      }`}
    >
      <div className={`${styles["settings-header-wrapper"]}`}>
        <button
          className={`${styles["settings-wrapper-return-btn"]} ${btnStyles["btn"]}`}
          onClick={() =>  handleCloseSettings()}
        >
          &larr;
        </button>
        <h2 className={styles["settings-header"]}>Settings</h2>
      </div>
      <Settings />
    </div>
  );
}
