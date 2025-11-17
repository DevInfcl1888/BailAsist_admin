import React, { useEffect, useState } from "react";
import styles from "./DataTable.module.css";
import HeaderBar from "../Header/Header";
import axiosInstace from "../../utils/axiosInstance";

const DataTable = ({
  listName,
  candidate,
  onAddClick,
  data,
  loading,
  error,
}) => {
  const titleClass =
    candidate === "User"
      ? `${styles.title} ${styles.headerBar_user}`
      : `${styles.title} ${styles.headerBar_bondsman}`;
  return (
    <>
      <div className={styles.headerBar}>
        <h2 className={titleClass}>{listName}</h2>
        <div className={styles.searchBox}>
          <input placeholder="Search by Name, Phone No" />
        </div>
        <button className={styles.addBtn} onClick={onAddClick}>
          ✚ Add {candidate}
        </button>
      </div>
      <div className={styles.tableContainer}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && (
          <table className={styles.bondsmanTable}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr key={user._id}>
                  <td>👤</td>
                  <td>{`${user.firstName || user.name} ${
                    user.middleName || " "
                  } ${user.lastName || " "}`}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.flag} {user.phoneNo}
                  </td>
                  <td>
                    <span
                      className={
                        user?.isActive
                          ? `${styles.statusActive}`
                          : `${styles.statusNonActive}`
                      }
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`}>
                      Edit
                    </button>{" "}
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* 🔁 For dynamic data:
          Replace 'data' array with API response:
          const [data, setData] = useState([]);
          useEffect(() => { fetch("/api/users").then(res=>res.json()).then(setData) }, []);
      */}
      </div>
    </>
  );
};

export default DataTable;
