import React from "react";
import styles from "./Button.module.css";
import { UserIcon, LogOut, ShieldPlusIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Button = ({ onUserClick, onBondsmanClick, onPrivacyClick, onLogout }) => {
  const location = useLocation();

  const buttons = [
    { name: "Dashboard", icon: <UserIcon size={19} />, path: "/dashboard", onClick: onUserClick },
    { name: "Contact Us", icon: <UserIcon size={18} />, path: "/contact", onClick: onBondsmanClick },
    { name: "Privacy", icon: <ShieldPlusIcon size={18} />, path: "/privacy", onClick: onPrivacyClick },
    { name: "Logout", icon: <LogOut size={18} />, path: "/logout", onClick: onLogout },
  ];

  return (
    <>
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`${styles.btnStyle} ${location.pathname === btn.path ? styles.active : ""}`}
          onClick={btn.onClick}
        >
          {btn.icon}
          &nbsp;&nbsp;
          <span>{btn.name}</span>
        </button>
      ))}
    </>
  );
};

export default Button;
