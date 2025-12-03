import React from "react";
import styles from "./Button.module.css";
import { UserIcon, LogOut, ShieldPlusIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Button = ({ onUserClick, onBondsmanClick, onPrivacyClick, onLogout }) => {
  const location = useLocation();

  const buttons = [
    { name: "Dashboard", icon: <img src="/dashboard.png" height={19} width={19} />, path: "/dashboard", onClick: onUserClick },
    { name: "Contact Us", icon: <img src="/call.png" height={19} width={19} />, path: "/contact", onClick: onBondsmanClick },
    { name: "Privacy Policy", icon: <img src="/contact-us.png" height={19} width={19} />, path: "/privacy", onClick: onPrivacyClick },
    { name: "Logout", icon: <img src="/logout.png" height={19} width={19} />, path: "/logout", onClick: onLogout },
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
