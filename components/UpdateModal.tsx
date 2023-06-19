import React from "react";
import styles from "../src/styles/UpdateModal.module.css";
import btnStyles from "../src/styles/Button.module.css";
import { useRef, useState } from "react";
import updateUsername from "@/firebase/database/updateUsername";
import updateEmail from "@/firebase/database/updateEmail";
import { useAuthContext } from "@/context/AuthContext";
import reauthenticateUser from "@/firebase/auth/reauthenticateUser";
import updatePassword from "@/firebase/database/updatePassword";
import { mapFirebaseErrorCode } from "@/firebase/config";

interface UpdateModalProps {
  handleRerender: Function;
  closeModalFunction: Function;
  field: "username" | "email" | "password";
}

export default function UpdateModal({
  handleRerender,
  closeModalFunction,
  field,
}: UpdateModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const authenticateEmailRef = useRef<HTMLInputElement>(null);
  const authenticatePasswordRef = useRef<HTMLInputElement>(null);
  const reEnterPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { user } = useAuthContext();
  function handleSubmitUpdate(e: React.SyntheticEvent) {
    e.preventDefault();
    const email = authenticateEmailRef?.current?.value;
    const password = authenticatePasswordRef?.current?.value;
    switch (field) {
      case "username":
        if (inputRef?.current?.value.trim().length === 0) {
          setErrorMsg("New username cannot be null");
          return;
        }
        const newUsername = inputRef!.current!.value;
        updateUsername(user!.uid, newUsername);
        closeModalFunction();
        handleRerender();
        break;
      case "email":
        if (
          authenticateEmailRef.current &&
          user?.email !== authenticateEmailRef.current.value.trim()
        ) {
          setErrorMsg("Incorrect current email.");
          return;
        }
        if (
          authenticatePasswordRef.current &&
          authenticatePasswordRef.current.value.trim().length === 0
        ) {
          setErrorMsg("Password cannot be null.");
          return;
        }
        if (inputRef.current && inputRef.current.value.trim().length === 0) {
          setErrorMsg("Your new email cannot be null");
          return;
        }
        const newEmail = inputRef!.current!.value;
        reauthenticateUser(email as string, password as string)
          .then(() => {
            updateEmail(newEmail, user!.uid)
              .then(() => {
                closeModalFunction();
                handleRerender();
              })
              .catch((error) => {
                setErrorMsg(mapFirebaseErrorCode(error.code));
                console.error(error.code, mapFirebaseErrorCode(error.code));
                authenticatePasswordRef.current!.value = "";
              });
          })
          .catch((error) => {
            setErrorMsg(mapFirebaseErrorCode(error.code));
            console.error(error.code, mapFirebaseErrorCode(error.code));
            authenticatePasswordRef.current!.value = "";
          });
        break;
      case "password":
        if (user?.email !== authenticateEmailRef?.current?.value.trim()) {
          setErrorMsg("Incorrect current email.");
          return;
        }
        if (authenticatePasswordRef?.current?.value.trim().length === 0) {
          setErrorMsg("Password cannot be null.");
          return;
        }
        if (inputRef?.current?.value.trim().length === 0) {
          setErrorMsg("Your new password cannot be empty");
          return;
        }
        if (
          inputRef?.current?.value.trim() !== reEnterPasswordRef?.current?.value.trim()
        ) {
          setErrorMsg("Your new passwords do not match.");
          return;
        }
        const newPassword = inputRef!.current!.value;
        reauthenticateUser(email as string, password as string)
          .then(() => {
            updatePassword(newPassword)
            .then(() => {
              closeModalFunction();
              handleRerender();
            })
          .catch((error) => {
            setErrorMsg(mapFirebaseErrorCode(error.code));
            console.error(error);
            authenticatePasswordRef.current!.value = "";
            inputRef.current!.value = "";
          });
          })
          .catch((error) => {
            setErrorMsg(mapFirebaseErrorCode(error.code));
            console.error(error);
            authenticatePasswordRef.current!.value = "";
            inputRef.current!.value = "";
          });
      default:
        return;
    }
  }
  return (
    <form
      className={styles["update-modal-wrapper"]}
      onSubmit={(e) => handleSubmitUpdate(e)}
    >
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {field === "username" && (
        <div className={styles["input-wrapper"]}>
          <label htmlFor="newUsername">Your new username: </label>
          <input
            name="newUsername"
            id="newUsername"
            type="text"
            placeholder="Enter your new username here"
            ref={inputRef}
          />
        </div>
      )}
      {field === "email" && (
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
      )}
      {field === "password" && (
        <div className={styles["input-wrapper"]}>
          <label htmlFor="newEmail">Your current email: </label>
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
          <label htmlFor="newPassword">Your new password: </label>
          <input
            name="newPassword"
            id="newPassword"
            type="password"
            placeholder="Enter your new password here"
            ref={inputRef}
          />
          <label htmlFor="re-enterNewPassword">
            Re-enter Your new password:{" "}
          </label>
          <input
            name="re-enterNewPassword"
            id="re-enterNewPassword"
            type="password"
            placeholder="Enter your new password here"
            ref={reEnterPasswordRef}
          />
        </div>
      )}
      <div className={styles["btn-wrapper"]}>
        <button
          className={`${btnStyles.btn} ${btnStyles.submit}`}
          type="submit"
        >
          Update
        </button>
        <button
          className={`${btnStyles.btn} ${btnStyles.cancel}`}
          onClick={() => closeModalFunction()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
