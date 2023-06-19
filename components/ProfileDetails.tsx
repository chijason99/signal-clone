import React from "react";
import styles from "../src/styles/ProfileDetails.module.css";

interface ProfileDetailsProps {
  criteria: string;
  value: string;
  handleClick:Function;
}

export default function ProfileDetails({
  criteria,
  value,
  handleClick,
}: ProfileDetailsProps) {

  return (
    <span
      className={styles["profile-detail-text"]}
      onClick={() => handleClick(true)}
    >
      {criteria[0].toUpperCase() + criteria.slice(1)} : {value}
    </span>
  );
}
