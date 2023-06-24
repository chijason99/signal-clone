import React from "react";
import styles from "../src/styles/UpdateForm.module.css";

interface UpdateEmailFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  authenticateEmailRef:  React.RefObject<HTMLInputElement>;
  authenticatePasswordRef:  React.RefObject<HTMLInputElement>;
}

export default function UpdateEmailForm({
  inputRef,
  authenticateEmailRef,
  authenticatePasswordRef
}: UpdateEmailFormProps) {
  return (
    <div className={styles["input-wrapper"]}>
    <label htmlFor="currentEmail">Your current email: </label>
    <input
      name="currentEmail"
      id="currentEmail"
      type="email"
      placeholder="Enter your current email here"
      ref={authenticateEmailRef}
    />
    <label htmlFor="newEmail">Your password: </label>
    <input
      name="password"
      id="password"
      type="password"
      placeholder="Enter your password here"
      ref={authenticatePasswordRef}
    />
    <label htmlFor="newEmail">Your new email: </label>
    <input
      name="newEmail"
      id="newEmail"
      type="email"
      placeholder="Enter your new email here"
      ref={inputRef}
    />
  </div>
  );
}
