import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import logo from "../../Assets/logo.jpg";
import styles from "./Dashboard.module.css";

function Dashboard() {
  //   const navigate = useNavigate();
  //   const [loading, setLoading] = useState(true);
  //   const [admin, setAdmin] = useState(null);
  //   const [dashboard, setDashboard] = useState({
  //     totalBondsman: 0,
  //     totalUsers: 0,
  //     bondsmanList: [],
  //     userList: [],
  //   });

  //   useEffect( async() => {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       navigate("/");
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const [bondsmanRes, userRes]= await Promise.all([
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/createNewBondsman"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),
  // axiosInstace.post("/adminLogout"),

  //       ])
  //     } catch (error) {}
  //   }, []);
  return (
    <div className={styles.leftSideBar}>
      <div className={styles.divImg}>
        <img src={logo} height={"180px"} alt="" />
      </div>

      <div className={styles.dashboard}>
        <h1>Admin Dashboard</h1>
        <div className={styles.buttonStyle}>
          <div className={styles.bondsmanCount}>Total Bondsman 4</div>
          <div className={styles.userCount}>Total User 4</div>
        </div>
        <div className={styles.adUpload}>
          <h2>Advertising</h2>
          <div className={styles.fileUpload}>file Upload</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
