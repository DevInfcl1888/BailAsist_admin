


// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstace from "../../utils/axiosInstance";
// import Sidebar from "../Sidebar/Sidebare";
// import DataTable from "../DataTable/DataTable";
// import AddUser from "../AddDataForm/AddUserTable";
// import Swal from "sweetalert2";
// import styles from "./Dashboard.module.css";
// import Imglogo from "../../Assets/image.png";

// function Dashboard() {
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [showAddBondsman, setShowAddBondsman] = useState(false);
//   const [currentType, setCurrentType] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState({ allUsers: [] });
//   const [usersCount, setUsersCount] = useState({ totalUsers: 0 });
//   const [bondsman, setBondsman] = useState({ listAllBondsman: [] });
//   const [error, setError] = useState("");

//   const [isSideOpen, setIsSideOpen] = useState(false);
//   const toggleSidebar = () => setIsSideOpen(!isSideOpen);

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       Swal.fire({
//         title: "Loading...",
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       const [bondsmanRes, usersRes, usersData] = await Promise.all([
//         axiosInstace.get("/api/v1/admin/getBondsmanDetails"),
//         axiosInstace.get("/api/v1/admin/getTotalUsersCount"),
//         axiosInstace.get("/api/v1/admin/getAllUsers"),
//       ]);

//       setUsers(usersData);
//       setUsersCount(usersRes);
//       setBondsman(bondsmanRes);

//       Swal.close();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAddClick = (type) => {
//     setCurrentType(type);
//     if (type === "User") setShowAddUser(true);
//     else setShowAddBondsman(true);
//     navigate(`/Add${type}`, { state: { candidate: type } });
//   };

//   return (
//     <>
//     <div style={{backgroundColor:"#fff"}}>
//       {/* Mobile Toggle Button */}
//       <button className={styles.toggleBtn} onClick={toggleSidebar}>
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div className={`${styles.leftSideBar} ${isSideOpen ? styles.open : ""}`}>
//         <Sidebar />
//       </div>

//       {/* Overlay when sidebar open */}
//       {isSideOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

//       <div className={styles.dashboard}>
//         <h1>Admin Dashboard</h1>

//         <div className={styles.buttonStyle}>
//           <div className={styles.bondsmanCount}>
//             Total Bondsman{" "}
//             {bondsman?.data?.message === "No bondsman found"
//               ? 0
//               : bondsman?.data?.isBondsmanAllExist?.length}
//           </div>
//           <div className={styles.userCount}>
//             Total User {usersCount?.data?.count || 0}
//           </div>
//         </div>

//         <div className={styles.adUpload}>
//           <h2>Advertising</h2>

//           <div className={styles.fileUpload}>
//             <div className={styles.uploadText}>
//               <img src={Imglogo} alt="" height={"60px"} />
//               <h3>Drag & Drop</h3>
//               <p>or select files from device</p>
//               <span>max. 50MB</span>
//             </div>
//           </div>

//           <div className={styles.fileInfo}>
//             <p>📝 my.pdf • 60 KB of 120 KB</p>
//             <span className={styles.status}>✔ Completed</span>
//           </div>
//         </div>
//       </div>

//       {/* Table / Add Pages */}
//       {showAddUser ? (
//         <AddUser candidate={currentType} />
//       ) : (
//         <DataTable
//           candidate={"User"}
//           listName="User List"
//           data={users?.data?.User}
//           error={error}
//           loading={loading}
//           onAddClick={() => handleAddClick("User")}
//           fetchData={fetchData}
//           deletAPI={"/api/v1/admin/deleteUserProfile"}
//         />
//       )}

//       {showAddBondsman ? (
//         <AddUser candidate={currentType} />
//       ) : (
//         <DataTable
//           candidate={"Bondsman"}
//           listName="Bondsman User List"
//           data={bondsman?.data?.isBondsmanAllExist}
//           error={error}
//           loading={loading}
//           onAddClick={() => handleAddClick("Bondsman")}
//           fetchData={fetchData}
//           deletAPI={"/api/v1/admin/deleteBondsmanProfile"}
//         />
//       )}
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Sidebar from "../Sidebar/Sidebare";
import DataTable from "../DataTable/DataTable";
import AddUser from "../AddDataForm/AddUserTable";
import Swal from "sweetalert2";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddBondsman, setShowAddBondsman] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({ allUsers: [] });
  const [usersCount, setUsersCount] = useState({ totalUsers: 0 });
  const [bondsman, setBondsman] = useState({ listAllBondsman: [] });
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // "uploading", "completed", ""

  const [isSideOpen, setIsSideOpen] = useState(false);
  const toggleSidebar = () => setIsSideOpen(!isSideOpen);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const [bondsmanRes, usersRes, usersData] = await Promise.all([
        axiosInstace.get("/api/v1/admin/getBondsmanDetails"),
        axiosInstace.get("/api/v1/admin/getTotalUsersCount"),
        axiosInstace.get("/api/v1/admin/getAllUsers"),
      ]);

      setUsers(usersData);
      setUsersCount(usersRes);
      setBondsman(bondsmanRes);

      Swal.close();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = (type) => {
    setCurrentType(type);
    if (type === "User") setShowAddUser(true);
    else setShowAddBondsman(true);
    navigate(`/Add${type}`, { state: { candidate: type } });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
      
      setUploadStatus("");
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
      
      setUploadStatus("");
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      Swal.fire("Error", "Please select a file first", "error");
      return;
    }

    try {
      setUploadStatus("uploading");
      
      const formData = new FormData();
      formData.append("advertisement", file);

      // Replace with your actual upload endpoint
      await axiosInstace.post("/api/v1/admin/uploadAdvertisement", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("completed");
      Swal.fire("Success", "File uploaded successfully!", "success");
    } catch (err) {
      setUploadStatus("");
      Swal.fire("Error", "Upload failed. Please try again.", "error");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setUploadStatus("");
  };

  return (
    <>
      <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        {/* Mobile Toggle Button */}

        {/* Sidebar */}
        <div className={`${styles.leftSideBar} ${isSideOpen ? styles.open : ""}`}>
          <Sidebar />
        </div>

        {/* Overlay when sidebar open */}
        {isSideOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

        <div className={styles.dashboard}>
          <h1>Admin Dashboard</h1>

          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.blueCard}`}>
              Total Bondsman <span>{bondsman?.data?.isBondsmanAllExist?.length || 0}</span>
            </div>
            <div className={`${styles.card} ${styles.greenCard}`}>
              Total Users <span>{usersCount?.data?.count || 0}</span>
            </div>
          </div>

          <div>
            <div className={styles.adUpload}>
              <h2>Advertising</h2>

              <div
                className={`${styles.uploadBox} ${
                  dragActive ? styles.activeDrag : ""
                }`}
                onDrop={handleDragDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
              >
                {filePreview ? (
                  <div className={styles.previewContainer}>
                    <img 
                      src={filePreview} 
                      alt="Preview" 
                      className={styles.previewImage}
                    />
                    <button 
                      className={styles.removeButton}
                      onClick={handleRemoveFile}
                    >
                      ✕
                    </button>
                  </div>
                ) : file ? (
                  <div className={styles.fileSelected}>
                    <p>📄 {file.name}</p>
                    <button 
                      className={styles.removeButton}
                      onClick={handleRemoveFile}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label htmlFor="uploadFile" className={styles.uploadContent}>
                    <img src="/upload.png" alt="Upload" height="89" width="89"/>
                    <h3 style={{fontSize:"28px" , fontWeight:600 , fontFamily:"Lexend" , cursor:"pointer"}}>Drag & Drop</h3>
                    <p style={{fontSize:"22px" , cursor:"pointer"}}>or select files from device</p>
                    <span style={{fontSize:"16px" ,cursor:"pointer"}}>max. 50MB</span>
                  </label>
                )}
                
                <input
                  id="uploadFile"
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/jpg"
                  onChange={handleFileUpload}
                  className={styles.hiddenFile}
                />
              </div>

              {/* Upload Button */}
              {file && !uploadStatus && (
                <button 
                  className={styles.uploadBtn}
                  onClick={handleUploadClick}
                >
                  Upload File
                </button>
              )}

              {/* Upload Status */}
              {uploadStatus === "uploading" && (
                <div className={styles.uploadStatus}>
                  <p>Uploading...</p>
                </div>
              )}

              {uploadStatus === "completed" && (
                <div className={styles.fileInfo}>
                  <p>📄 {file.name}</p>
                  <span className={styles.status}>✔ Completed</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.tableContainer}>
            {showAddUser ? (
              <AddUser candidate={currentType} />
            ) : (
              <DataTable
                candidate={"User"}
                listName="User List"
                data={users?.data?.User}
                error={error}
                loading={loading}
                onAddClick={() => handleAddClick("User")}
                fetchData={fetchData}
                deletAPI={"/api/v1/admin/deleteUserProfile"}
              />
            )}

            {showAddBondsman ? (
              <AddUser candidate={currentType} />
            ) : (
              <DataTable
                candidate={"Bondsman"}
                listName="Bondsman User List"
                data={bondsman?.data?.isBondsmanAllExist}
                error={error}
                loading={loading}
                onAddClick={() => handleAddClick("Bondsman")}
                fetchData={fetchData}
                deletAPI={"/api/v1/admin/deleteBondsmanProfile"}
              />
            )}
          </div> 
        </div>
      </div>
    </>
  );
}

export default Dashboard;