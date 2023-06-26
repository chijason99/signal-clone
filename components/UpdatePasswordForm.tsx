import styles from "../src/styles/UpdateForm.module.css";

interface UpdatePasswordFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  authenticateEmailRef: React.RefObject<HTMLInputElement>;
  authenticatePasswordRef: React.RefObject<HTMLInputElement>;
  reEnterPasswordRef: React.RefObject<HTMLInputElement>;
}

export default function UpdatePasswordForm({
  inputRef,
  authenticateEmailRef,
  authenticatePasswordRef,
  reEnterPasswordRef,
}: UpdatePasswordFormProps) {
  return (
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
      <label htmlFor="re-enterNewPassword">Re-enter Your new password: </label>
      <input
        name="re-enterNewPassword"
        id="re-enterNewPassword"
        type="password"
        placeholder="Enter your new password here"
        ref={reEnterPasswordRef}
      />
    </div>
  );
}
