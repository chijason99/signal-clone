import styles from "../src/styles/UpdateForm.module.css";

interface UpdateUsernameFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function UpdateUsernameForm({
  inputRef,
}: UpdateUsernameFormProps) {
  return (
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
  );
}
