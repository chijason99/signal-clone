"use client";

// hooks
import { useRef, useState } from "react";
import { useRouter } from "next/router";

// components
import NavBar from "../../../components/NavBar";
import PhoneNumberInput from "../../../components/PhoneNumberInput";

// firebase functions
import signUpFunc from "@/firebase/auth/signUpFunc";

// css
import styles from "../../styles/AuthForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// utils
import { checkPhoneNumberLength } from "../../../lib/chats";

export default function SignInForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef1 = useRef<HTMLInputElement>(null);
  const phoneNumberRef2 = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleSignUp(e: React.SyntheticEvent) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current && usernameRef.current) {
      if (
        emailRef.current.value.trim() == null ||
        passwordRef.current.value.trim() == null
      ) {
        setErrorMsg("Invalid email or password. Please try again.");
        return;
      }
      if (
        usernameRef.current.value.trim() == null ||
        usernameRef.current.value.trim().length < 2
      ) {
        setErrorMsg("The username must be at least two characters long.");
        return;
      }
      if (
        !checkPhoneNumberLength(phoneNumberRef1!.current!.value, 5) ||
        !checkPhoneNumberLength(phoneNumberRef2!.current!.value, 6)
      ) {
        setErrorMsg("Invalid phone number");
        return;
      }
      const targetPhoneNumber =
        phoneNumberRef1!.current!.value + phoneNumberRef2!.current!.value;
      const { result, error } = await signUpFunc(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value,
        targetPhoneNumber
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
          data-cy="sign-up-email"
          placeholder="Enter your email here"
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          data-cy="sign-up-pw"
          ref={passwordRef}
          placeholder="Enter your password here"
        />
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          data-cy="sign-up-username"
          ref={usernameRef}
          placeholder="This will be you username. It needs to be at least 2 characters long."
        />
        <PhoneNumberInput
          phoneNumberRef1={phoneNumberRef1}
          phoneNumberRef2={phoneNumberRef2}
          isSignUp={true}
        />
        <input
          type="submit"
          data-cy="sign-up-btn"
          value="Sign Up"
          className={` ${btnStyles.btn} ${btnStyles.submit}`}
        />
      </form>
    </>
  );
}
