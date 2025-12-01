import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png";
import Button from "../Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(""); // Track active button
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setOpen(!open);

  const handleLogout = async () => {
    setActiveBtn("Logout"); // mark button as active immediately
    const confirm = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      width: "350px",
    });

    if (confirm.isConfirmed) {
      localStorage.removeItem("accessToken");
      navigate("/");
    } else {
      setActiveBtn(""); // reset active if canceled
    }
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
      <div className={styles.mobileToggle} onClick={toggleSidebar}>
        <Menu size={25} />
      </div>

      <div className={`${styles.divImg} ${open ? styles.showSidebar : ""}`}>
        <img src={logo} height={"150px"} alt="" />
        <Button
          onUserClick={handleDashboard}
          onBondsmanClick={handleContactUs}
          onPrivacyClick={handlePrivacy}
          onLogout={handleLogout}
          activeBtn={activeBtn} // pass active button state
        />
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </>
  );
};

export default Sidebar;
