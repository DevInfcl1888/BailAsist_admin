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
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  // const handleLogout = async () => {
  //   localStorage.removeItem("accessToken");
  //   navigate("/");
  // };
  const handleLogout = async () => {
  const confirm = await Swal.fire({
    title: "Logout",
    text: "Are you sure you want to logout ?",
    // icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Comfirm",
       confirmButtonColor: "#d33",   // red button  
    cancelButtonColor: "#3085d6",
    width: "350px",

  });

  if (confirm.isConfirmed) {
    localStorage.removeItem("accessToken")

    navigate("/");
  }
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
