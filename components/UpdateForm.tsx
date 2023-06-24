import React from "react";
import styles from "../src/styles/UpdateForm.module.css";
import btnStyles from "../src/styles/Button.module.css";
import { useRef, useState } from "react";
import updateUsername from "@/firebase/database/updateUsername";
import updateEmail from "@/firebase/database/updateEmail";
import { useAuthContext } from "@/context/AuthContext";
import reauthenticateUser from "@/firebase/auth/reauthenticateUser";
import updatePassword from "@/firebase/database/updatePassword";
import { mapFirebaseErrorCode } from "@/firebase/config";
import UpdateUsernameForm from "./UpdateUsernameForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateEmailForm from "./UpdateEmailForm";

interface UpdateFormProps {
  handleRerender: Function;
  closeModalFunction: Function;
  field: "username" | "email" | "password";
}

export default function UpdateForm({
  handleRerender,
  closeModalFunction,
  field,
}: UpdateFormProps) {
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
    
      const handleUpdateSuccess = () => {
        closeModalFunction();
        handleRerender();
      };
    
      const handleUpdateError = (error: any) => {
        setErrorMsg(mapFirebaseErrorCode(error.code));
        console.error(error.code, mapFirebaseErrorCode(error.code));
        authenticatePasswordRef.current!.value = "";
        inputRef.current!.value = "";
      };
    
      const updateUsernameField = () => {
        if (inputRef?.current?.value.trim().length === 0) {
          setErrorMsg("New username cannot be null");
          return;
        }
        const newUsername = inputRef!.current!.value;
        updateUsername(user!.uid, newUsername)
          .then(handleUpdateSuccess)
          .catch(handleUpdateError);
      };
    
      const updateEmailField = () => {
        if (user?.email !== authenticateEmailRef?.current?.value.trim()) {
          setErrorMsg("Incorrect current email.");
          return;
        }
        if (authenticatePasswordRef?.current?.value.trim().length === 0) {
          setErrorMsg("Password cannot be null.");
          return;
        }
        if (inputRef?.current?.value.trim().length === 0) {
          setErrorMsg("Your new email cannot be null");
          return;
        }
        const newEmail = inputRef!.current!.value;
    
        reauthenticateUser(email as string, password as string)
          .then(() => updateEmail(newEmail, user!.uid))
          .then(handleUpdateSuccess)
          .catch(handleUpdateError);
      };
    
      const updatePasswordField = () => {
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
          inputRef?.current?.value.trim() !==
          reEnterPasswordRef?.current?.value.trim()
        ) {
          setErrorMsg("Your new passwords do not match.");
          return;
        }
        const newPassword = inputRef!.current!.value;
    
        reauthenticateUser(email as string, password as string)
          .then(() => updatePassword(newPassword))
          .then(handleUpdateSuccess)
          .catch(handleUpdateError);
      };
    
      switch (field) {
        case "username":
          updateUsernameField();
          break;
        case "email":
          updateEmailField();
          break;
        case "password":
          updatePasswordField();
          break;
        default:
          return;
      }
    
  }
  return (
    <form
      className={styles["update-form"]}
      onSubmit={(e) => handleSubmitUpdate(e)}
    >
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {field === "username" && <UpdateUsernameForm inputRef={inputRef} />}
      {field === "email" && (
        <UpdateEmailForm
          inputRef={inputRef}
          authenticateEmailRef={authenticateEmailRef}
          authenticatePasswordRef={authenticatePasswordRef}
        />
      )}
      {field === "password" && (
        <UpdatePasswordForm
          inputRef={inputRef}
          reEnterPasswordRef={reEnterPasswordRef}
          authenticateEmailRef={authenticateEmailRef}
          authenticatePasswordRef={authenticatePasswordRef}
        />
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
