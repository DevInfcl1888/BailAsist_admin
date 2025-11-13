import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import logo from "../../Assets/logo.png";
import styles from "./Dashboard.module.css";
import Sidebar from "../Sidebar/Sidebare";
import DataTable from "../DataTable/DataTable";
import Imglogo from "../../Assets/image.png";
import AddUser from "../AddUserTable/AddUserTable";

function Dashboard() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [showAddBondsman, setShowAddBondsman] = useState("");
  const navigate = useNavigate();
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

  const handleUserAddClick = (type) => {
    setCurrentType(type);
    setShowAddUser(true);
    navigate("/AddUser", {
      state: {
        candidate: type,
      },
    });
  };

  const handleBondsmanAddClick = (type) => {
    setCurrentType(type);
    setShowAddBondsman(true);
    navigate("/AddUser", {
      state: {
        candidate: type,
      },
    });
  };
  return (
    <>
      <div className={styles.leftSideBar}>
        <Sidebar />
        <div className={styles.dashboard}>
          <h1>Admin Dashboard</h1>

          <div className={styles.buttonStyle}>
            <div className={styles.bondsmanCount}>Total Bondsman {}</div>
            <div className={styles.userCount}>Total User {}</div>
          </div>
          <div className={styles.adUpload}>
            <h2>Advertising</h2>

            <div className={styles.fileUpload}>
              <div className={styles.uploadText}>
                <img src={Imglogo} alt="" height={"60px"} />
                <h3>Drag & Drop</h3>
                <p>or select files from device</p>
                <span>max. 50MB</span>
              </div>
            </div>

            <div className={styles.fileInfo}>
              <p>📝 my.pdf &nbsp; 60 KB of 120 KB •</p>
              <span className={styles.status}>✔ Completed</span>
            </div>
          </div>
        </div>
      </div>
      {
        showAddUser ? (
          <AddUser candidate={currentType} />
        ) : (
          <DataTable
            candidate={"User"}
            listName="User List"
            onAddClick={() => handleUserAddClick("User")}
          />
        )
        // ✅ pass handler here
      }

      {showAddBondsman ? (
        <AddUser candidate={currentType} />
      ) : (
        <DataTable
          candidate={"Bondsman"}
          listName="Bondsman User List"
          onAddClick={() => handleBondsmanAddClick("Bondsman")} // ✅ pass handler here
        />
      )}
    </>
  );
}

export default Dashboard;
