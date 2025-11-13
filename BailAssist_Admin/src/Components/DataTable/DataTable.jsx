import React from "react";
import styles from "./DataTable.module.css";
import HeaderBar from "../Header/Header";

const DataTable = ({ listName, candidate, onAddClick }) => {
  // Dummy Data
  const data = [
    {
      id: 1,
      name: "Dr. Saraj Gupta",
      email: "test121@gmail.com",
      phone: "+13462127336",
      status: "Active",
      flag: "🇺🇸",
    },
    {
      id: 2,
      name: "Rahul Pundir",
      email: "ghgh11@gmail.com",
      phone: "+918396065885",
      status: "Active",
      flag: "🇮🇳",
    },
  ];
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
            {data.map((user) => (
              <tr key={user.id}>
                <td>👤</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.flag} {user.phone}
                </td>
                <td>
                  <span className={styles.statusActive}>{user.status}</span>
                </td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.editBtn}`}>
                    Edit
                  </button>{" "}
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
