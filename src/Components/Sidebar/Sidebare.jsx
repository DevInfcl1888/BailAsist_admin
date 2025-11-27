import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import { Menu } from "lucide-react"; // Toggle icon

const Sidebar = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false); // Sidebar toggle state
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      {/* ---------- TOGGLE BUTTON FOR MOBILE ---------- */}
      <div className={styles.mobileToggle} onClick={toggleSidebar}>
        <Menu size={25} />
      </div>

      {/* ---------- SIDEBAR ---------- */}
      <div className={`${styles.divImg} ${open ? styles.showSidebar : ""}`}>
        <img src={logo} height={"150px"} alt="" />
        <Button onLogout={handleLogout} />
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </>
  );
};

export default Sidebar;
