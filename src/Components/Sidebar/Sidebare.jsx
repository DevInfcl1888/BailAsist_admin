import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png";
import Button from "../Button/Button";
import { Menu } from "lucide-react";
import ConfirmPopup from "../Button/ConfirmPopup";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  // 🔥 Open Logout ConfirmPopup
  const handleLogout = () => {
    setLogoutConfirm(true);
  };

  // 🔥 Confirm Logout
  const confirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogoutConfirm(false);
    navigate("/");
  };

  // ❌ Cancel Logout
  const cancelLogout = () => {
    setLogoutConfirm(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className={styles.mobileToggle} onClick={toggleSidebar}>
        <Menu size={25} />
      </div>

      <div className={`${styles.divImg} ${open ? styles.showSidebar : ""}`}>
        <img src={logo} height="150px" alt="Logo" />

        {/* 🔥 Button Component */}
        <Button onLogout={handleLogout} />
      </div>

      {/* 🔥 LOGOUT CONFIRM POPUP */}
      <ConfirmPopup
        isOpen={logoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Sidebar;
