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
import AddUser from "../AddDataForm/AddUserTable";
import NoData from "../CustomMessage/CustomMessage";
function Dashboard() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [showAddBondsman, setShowAddBondsman] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({ allUsers: [] });
  const [usersCount, setUsersCount] = useState({ totalUsers: 0 });
  const [bondsman, setBondsman] = useState({ listAllBondsman: [] });
  // const [searchText, setSearchText] = useState("");
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bondsmanRes, usersRes, usersData] = await Promise.all([
        axiosInstace.get("/api/v1/admin/getBondsmanDetails"),
        axiosInstace.get("/api/v1/admin/getTotalUsersCount"),
        axiosInstace.get("/api/v1/admin/getAllUsers"),
      ]);

      setUsers(usersData);
      setUsersCount(usersRes);
      setBondsman(bondsmanRes);
      console.log("bondsmanRes", bondsmanRes);
      console.log("usersRes", usersRes);
      console.log("usersData", usersData);

      setLoading(false);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserAddClick = (type) => {
    setCurrentType(type);
    setShowAddUser(true);
    navigate(`/Add${type}`, {
      state: {
        candidate: type,
      },
    });
  };

  const handleBondsmanAddClick = (type) => {
    setCurrentType(type);
    setShowAddBondsman(true);
    navigate(`/Add${type}`, {
      state: {
        candidate: type,
      },
    });
  };
  return (
    <>
      {/* <div className={styles.pageWrapper}> */}
        <div className={styles.leftSideBar}>
          <Sidebar />
          <div className={styles.dashboard}>
            <h1>Admin Dashboard</h1>

            <div className={styles.buttonStyle}>
              <div className={styles.bondsmanCount}>
                Total Bondsman{" "}
                {bondsman?.data?.message === "No bondsman found"
                  ? 0
                  : bondsman?.data?.isBondsmanAllExist?.length}
              </div>
              <div className={styles.userCount}>
                Total User{" "}
                {usersCount?.data?.count === 0 ? 0 : usersCount?.data?.count}
              </div>
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

              {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
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
              data={users?.data?.User}
              error={error}
              loading={loading}
              onAddClick={() => handleUserAddClick("User")}
              fetchData={fetchData}
              deletAPI={"/api/v1/admin/deleteUserProfile"}
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
            data={bondsman?.data?.isBondsmanAllExist}
            error={error}
            loading={loading}
            onAddClick={() => handleBondsmanAddClick("Bondsman")} // ✅ pass handler here
            fetchData={fetchData}
            deletAPI={"/api/v1/admin/deleteBondsmanProfile"}
          />
        )}
      {/* </div> */}
    </>
  );
}

export default Dashboard;
