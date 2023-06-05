"use client";

import signInFunc from "@/firebase/auth/signInFunc";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import styles from "../../styles/AuthForm.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function SignInForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleSignIn(e: React.SyntheticEvent) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      if (
        emailRef.current.value.trim() == null ||
        passwordRef.current.value.trim() == null
      ) {
        setErrorMsg("Invalid email or password. Please try again.");
        return;
      }
      const { error } = await signInFunc(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (error) {
        setErrorMsg("Invalid email or password. Please try again.");
        passwordRef.current.value = "";
        console.error(error);
        return;
      }
      router.push("/");
    }
  }
  return (
    <>
      <NavBar />
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}
      <form onSubmit={(e) => handleSignIn(e)} className={styles["auth-form"]}>
        <label htmlFor="email">Email Address: </label>
        <input
          type="email"
          name="email"
          id="email"
          data-cy="sign-in-email"
          ref={emailRef}
          placeholder="Enter your email here"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          data-cy="sign-in-pw"
          ref={passwordRef}
          placeholder="Enter your password here"
        />
        <input
          type="submit"
          value="Sign In"
          data-cy="sign-in-btn"
          className={` ${btnStyles.btn} ${btnStyles.submit}`}
        />
      </form>
    </>
  );
}
