import React from "react";
import styles from "./Button.module.css";
import { UserIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { Phone } from "lucide-react";
import { ShieldPlusIcon } from "lucide-react";

const Button = ({
  onUserClick,
  onBondsmanClick,
  onPrivacyClick,
  onPhoneClick,
  onLogout,
}) => {
  return (
    <>
      <button className={styles.btnStyle} onClick={onUserClick}>
        <UserIcon size={19} className={styles.icon} />
        &nbsp;&nbsp;
        <span>User</span>
      </button>
      <button className={styles.btnStyle} onClick={onBondsmanClick}>
        <UserIcon size={18} className={styles.icon} />
        &nbsp;&nbsp;
        <span>Bondsman</span>
      </button>
      <button className={styles.btnStyle} onClick={onPrivacyClick}>
        <ShieldPlusIcon size={18} className={styles.icon} />
        &nbsp;&nbsp;
        <span>Privacy</span>
      </button>
      <button className={styles.btnStyle} onClick={onPhoneClick}>
        <Phone size={18} className={styles.icon} />
        &nbsp;&nbsp;
        <span>Phone</span>
      </button>
      <button className={styles.btnStyle} onClick={onLogout}>
        <LogOut size={18} className={styles.icon} />
        &nbsp;&nbsp;
        <span>Logout</span>
      </button>
    </>
  );
};

export default Button;
