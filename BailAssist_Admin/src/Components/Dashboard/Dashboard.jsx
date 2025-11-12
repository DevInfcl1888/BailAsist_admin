import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import logo from "../../Assets/logo.png";
import styles from "./Dashboard.module.css";
import headerStyles from "../DataTable/CustomCSS.module.css";
import Sidebar from "../Sidebar/Sidebare";
import DataTable from "../DataTable/DataTable";
import HeaderBar from "../Header/Header";

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
    <>
      <div className={styles.leftSideBar}>
        <Sidebar />
        <div className={styles.dashboard}>
          <h1>Admin Dashboard</h1>

          <div className={styles.buttonStyle}>
            <div className={styles.bondsmanCount}>Total Bondsman 4</div>
            <div className={styles.userCount}>Total User 4</div>
          </div>
          <div className={styles.adUpload}>
            <h2>Advertising</h2>

            <div className={styles.fileUpload}>
              <div className={styles.uploadText}>
                <h3>Drag & Drop</h3>
                <p>or select files from device</p>
                <span>max. 50MB</span>
              </div>
            </div>

            <div className={styles.fileInfo}>
              <p>📄 my.pdf &nbsp; 60 KB of 120 KB •</p>
              <span className={styles.status}>✔ Completed</span>
            </div>
          </div>
        </div>
      </div>

      <HeaderBar
        customClass={`${headerStyles.headerBar_bondsman} ${headerStyles.addBtn_bondsman}`}
        candidate={"Bondsman"}
        listName={"Bondsman User list"}
      />
      <DataTable />
      <HeaderBar
        customClass={`${headerStyles.headerBar_user} ${headerStyles.addBtn_user}`}
        candidate={"User"}
        listName={"User list"}
      />
      <DataTable />
    </>
  );
}

export default Dashboard;
