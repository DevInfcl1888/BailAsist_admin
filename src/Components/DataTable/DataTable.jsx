import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import styles from "./DataTable.module.css";
import NoData from "../CustomMessage/CustomMessage";
import axiosInstace from "../../utils/axiosInstance";
import { confirmDialog } from "../../utils/notificationToast";

const DataTable = ({
  listName,
  candidate,
  onAddClick,
  data,
  loading,
  error,
  fetchData,
  deletAPI,
}) => {
  const [loader, setLoader] = useState(false);
  const [errror, settError] = useState(false);
  const titleClass =
    candidate === "User"
      ? `${styles.title} ${styles.headerBar_user}`
      : `${styles.title} ${styles.headerBar_bondsman}`;
  const capitalizeFirst = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      Swal.close();
    }
  }, [error]);

  const handleEdit = async (id) => {
    
  }
  const handleDelete = async (id) => {
    // e.preventDefault();

    settError(true);
    try {
      const confirmation = await confirmDialog(
        "Delete",
        "Are you sure",
        "warning",
        "Delete",
        "Cancel"
      );
      if (!confirmation.isConfirmed) return;

      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosInstace.delete(`${deletAPI}/${id}`, {
        withCredentials: true,
      });
      await fetchData();
      Swal.fire("Deleted!", "User has been deleted.", "success");

      setLoader(false);

      console.log("res", res);
    } catch (error) {
      settError(error?.response?.data?.message || "Something went wrong");
      Swal.fire("Error", "Unable to delete user", "error");
    } finally {
      // 6. Loader OFF
      setLoader(false);
    }
  };
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
        {!loading && (!data || data.length === 0) ? (
          <NoData message={`No ${candidate} Found`} />
        ) : (
          !loading && (
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
                    <td>{`${
                      capitalizeFirst(user.firstName || user.name) || " "
                    } ${capitalizeFirst(user.middleName) || " "} ${
                      capitalizeFirst(user.lastName) || " "
                    }`}</td>

                    <td>{user.email || " "}</td>
                    <td>
                      {user.flag} {user.phoneNo}
                    </td>

                    <td>
                      <span
                        className={
                          user?.isActive
                            ? styles.statusActive
                            : styles.statusNonActive
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>

                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
};

export default DataTable;
