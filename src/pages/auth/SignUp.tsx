"use client";

import signUpFunc from "@/firebase/auth/signUpFunc";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import styles from "../../styles/AuthForm.module.css";
import btnStyles from "../../styles/Button.module.css"

export default function SignInForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleSignUp(e: React.SyntheticEvent) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      if (
        emailRef.current.value.trim() == null ||
        passwordRef.current.value.trim() == null
      ) {
        setErrorMsg("Invalid email or password. Please try again.");
        return;
      }
      const { result, error } = await signUpFunc(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (error) {
        setErrorMsg("Invalid email or password. Please try again.");
        console.error(error);
        return;
      }
      console.log(result);
      router.push("/");
    }
  }
  return (
    <>
      <NavBar />
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}
      <form onSubmit={(e) => handleSignUp(e)} className={styles["auth-form"]}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          placeholder="Enter your email here"
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          placeholder="Enter your password here"
        />
        <input type="submit" value="Sign Up" className={` ${btnStyles.btn} ${btnStyles.submit}`} />
      </form>
    </>
  );
}
