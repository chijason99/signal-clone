// hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

// firebase functions
import getUserProfile from "@/firebase/database/getUserProfile";

// components
import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import LeftSideModal from "./LeftSideModal";
import UpdateForm from "./UpdateForm";

// css
import styles from "../src/styles/Settings.module.css";

export default function Settings() {
  const { user } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [isUpdateUsername, setIsUpdateUsername] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isUpdateEmail, setIsUpdateEmail] = useState<boolean>(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function getUsernameAndUserEmail(id: string) {
      const data = await getUserProfile(id);
      setUsername(data.username);
      setEmail(data.email);
    }
    if (user) {
      getUsernameAndUserEmail(user.uid);
    }
  }, [user, refreshKey]);

  function handleClickUsername() {
    handleCloseUpdateForm();
    setIsUpdateUsername(true);
  }

  function handleClickEmail() {
    handleCloseUpdateForm();
    setIsUpdateEmail(true);
  }

  function handleClickPassword() {
    handleCloseUpdateForm();
    setIsUpdatePassword(true);
  }

  function handleCloseUpdateForm() {
    setIsUpdateUsername(false);
    setIsUpdateEmail(false);
    setIsUpdatePassword(false);
  }

  function handleRerender() {
    setRefreshKey((prevKey) => prevKey + 1);
  }
  
  return (
    <div className={styles.settings}>
      <div className={styles["profile"]}>
        <Image
          src={"/puppy.jpg"}
          alt="Profile pic"
          width={100}
          height={100}
          className={styles["profile-pic"]}
        />
        <ProfileDetails
          criteria={"username"}
          value={username}
          handleClick={handleClickUsername}
        />
        <ProfileDetails
          criteria={"email"}
          value={email}
          handleClick={handleClickEmail}
        />
        <ProfileDetails
          criteria={"password"}
          value={"**********"}
          handleClick={handleClickPassword}
        />
      </div>
      {isUpdateUsername && (
        <LeftSideModal>
          <UpdateForm
            handleRerender={handleRerender}
            closeModalFunction={handleCloseUpdateForm}
            field={"username"}
          />
        </LeftSideModal>
      )}
      {isUpdateEmail && (
        <LeftSideModal>
          <UpdateForm
            handleRerender={handleRerender}
            closeModalFunction={handleCloseUpdateForm}
            field={"email"}
          />
        </LeftSideModal>
      )}
      {isUpdatePassword && (
        <LeftSideModal>
          <UpdateForm
            handleRerender={handleRerender}
            closeModalFunction={handleCloseUpdateForm}
            field={"password"}
          />
        </LeftSideModal>
      )}
    </div>
  );
}
