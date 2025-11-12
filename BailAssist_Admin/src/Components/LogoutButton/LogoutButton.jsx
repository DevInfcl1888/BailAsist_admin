import React from "react";
import styles from "./LogoutButton.module.css";
import { LogOut } from "lucide-react"; // optional icon (lucide-react already available)

const LogoutButton = ({ onLogout }) => {
  return (
    <button className={styles.btnStyle} onClick={onLogout}>
      <LogOut size={18} className={styles.icon} />
      <span>Logout</span> 
    </button>
  );
};

export default LogoutButton;
