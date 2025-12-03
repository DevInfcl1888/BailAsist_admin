import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png";
import Button from "../Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import ConfirmPopup from "../Button/ConfirmPopup";

const Sidebar = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(""); // Track active button
  const [logoutConfirm, setLogoutConfirm] = useState(false); // Logout popup state
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setOpen(!open);

  // Open Logout ConfirmPopup
  const handleLogout = () => {
    setActiveBtn("Logout");
    setLogoutConfirm(true);
  };

  // Called when user confirms logout
  const confirmLogout = () => {
    setLogoutConfirm(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  // Cancel logout
  const cancelLogout = () => {
    setLogoutConfirm(false);
    setActiveBtn("");
  };

  const handleContactUs = () => {
    setActiveBtn("Contact Us");
    navigate("/contact");
  };

  const handleDashboard = () => {
    setActiveBtn("Dashboard");
    navigate("/dashboard");
  };

  const handlePrivacy = () => {
    setActiveBtn("Privacy");
    navigate("/privacy");
  };

  return (
    <>
      {/* Sidebar Toggle */}
      <div className={styles.mobileToggle} onClick={toggleSidebar}>
        <Menu size={25} />
      </div>

      <div className={`${styles.divImg} ${open ? styles.showSidebar : ""}`}>
        <img src={logo} height={"150px"} alt="Logo" />

        <Button
          onUserClick={handleDashboard}
          onBondsmanClick={handleContactUs}
          onPrivacyClick={handlePrivacy}
          onLogout={handleLogout}
          activeBtn={activeBtn} // pass active button state
        />

        <p style={{ color: "red" }}>{error}</p>
      </div>

      {/* ConfirmPopup for Logout */}
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
