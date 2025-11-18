import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png"; // adjust path to your logo
import LogoutButton from "../LogoutButton/LogoutButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axiosInstace.post(
        "/api/v1/admin/adminLogout",
        {},
        { withCredentials: true }
      );
      console.log("res", res);
      if (res.status === 200) {
        setLoader(false);
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.log("error", error);
      setLoader(false);
    }
  };
  return (
    <>
      <div className={styles.divImg}>
        <img src={logo} height={"180px"} alt="" />
        <button className={styles.btnStyle}>Admin Panel</button>
        <LogoutButton onLogout={handleLogout} />
        <p style={{color:"red"}}>
          {error?.response?.data.message}
        </p>
      </div>
    </>
  );
};

export default Sidebar;
