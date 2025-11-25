import React from "react";
import styles from "./LogoutButton.module.css";
import { UserIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { Phone } from "lucide-react";
import { ShieldPlusIcon } from "lucide-react";
import { ShieldPlus } from "lucide-react";
import { ContactIcon } from "lucide-react";
import { ContactRound } from "lucide-react";
import { ContactRoundIcon } from "lucide-react";

const LogoutButton = ({ onLogout }) => {
  return (
    <>
      <button className={styles.btnStyle} onClick={onLogout}>
        <UserIcon size={19} className={styles.icon} />
        <span>User</span>
      </button>
      <button className={styles.btnStyle} onClick={onLogout}>
        <UserIcon size={18} className={styles.icon} />
        <span>Bondsman</span>
      </button>
      <button className={styles.btnStyle} onClick={onLogout}>
        <ShieldPlusIcon size={18} className={styles.icon} />
        <span>ShieldPlusIcon</span>
      </button>
      <button className={styles.btnStyle} onClick={onLogout}>
        <Phone size={18} className={styles.icon} />
        <span>Phone</span>
      </button>
      <button className={styles.btnStyle} onClick={onLogout}>
        <LogOut size={18} className={styles.icon} />
        <span>Logout</span>
      </button>
    </>
  );
};

export default LogoutButton;
