import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../src/styles/Settings.module.css";
import ProfileDetails from "./ProfileDetails";
import getUserProfile from "@/firebase/database/getUserProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useSettingsContext } from "@/context/SettingsContext";
import UpdateModal from "./UpdateModal";

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
    handleCloseUpdateModal();
    setIsUpdateUsername(true);
  }
  function handleClickEmail() {
    handleCloseUpdateModal();
    setIsUpdateEmail(true);
  }
  function handleClickPassword() {
    handleCloseUpdateModal();
    setIsUpdatePassword(true);
  }
  function handleCloseUpdateModal() {
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
        <UpdateModal
          handleRerender={handleRerender}
          closeModalFunction={handleCloseUpdateModal}
          field={"username"}
        />
      )}
      {isUpdateEmail && (
        <UpdateModal
          handleRerender={handleRerender}
          closeModalFunction={handleCloseUpdateModal}
          field={"email"}
        />
      )}
      {isUpdatePassword && (
        <UpdateModal
          handleRerender={handleRerender}
          closeModalFunction={handleCloseUpdateModal}
          field={"password"}
        />
      )}
    </div>
  );
}
