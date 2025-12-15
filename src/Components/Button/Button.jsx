import React from "react";
import styles from "./Button.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Button = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { 
      name: "Dashboard", 
      icon: <img src="/dashboard.png" height={19} width={19} />, 
      path: "/dashboard",
      matchPaths: ["/dashboard", "/UpdateUser", "/UpdateBondsman"]
    },
    { 
      name: "Contact Us", 
      icon: <img src="/call.png" height={19} width={19} />, 
      path: "/contact",
      matchPaths: ["/contact"]
    },
    { 
      name: "Privacy Policy", 
      icon: <img src="/contact-us.png" height={19} width={19} />, 
      path: "/privacy",
      matchPaths: ["/privacy"]
    },
    { 
      name: "Logout", 
      icon: <img src="/logout.png" height={19} width={19} />, 
      matchPaths: [],
      onClick: onLogout   // 🔥 Sidebar se aayega
    },
  ];

  const isActive = (btn) =>
    btn.matchPaths?.some(path => location.pathname.startsWith(path));

  const handleClick = (btn) => {
    if (btn.onClick) {
      btn.onClick();
    } else {
      navigate(btn.path);
    }
  };

  return (
    <>
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`${styles.btnStyle} ${isActive(btn) ? styles.active : ""}`}
          onClick={() => handleClick(btn)}
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
