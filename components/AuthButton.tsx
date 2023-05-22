import { useRouter } from "next/router";
import styles from "../src/styles/Button.module.css";

type ButtonProps = {
  displayText: string;
  isAuth: boolean;
  path: string;
};

export default function AuthButton({ displayText, isAuth, path }: ButtonProps) {
  const router = useRouter();
  function handleRedirect(redirectPath: string) {
    router.push(redirectPath);
  }
  return (
    <button
      className={`${styles.btn} ${isAuth ? styles.auth : ""}`}
      onClick={() => handleRedirect(path)}
    >
      {displayText}
    </button>
  );
}
