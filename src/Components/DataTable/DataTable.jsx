import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import styles from "./DataTable.module.css";
import NoData from "../CustomMessage/CustomMessage";
import axiosInstace from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../Button/ConfirmPopup";

const DataTable = ({
  listName,
  candidate,
  data,
  loading,
  error,
  fetchData,
  deletAPI,
}) => {
  const [loader, setLoader] = useState(false);
  const [errror, settError] = useState(false);

  const [open, setOpen] = useState(false); // <-- popup state
  const [deleteId, setDeleteId] = useState(null); // <-- store which ID to delete

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const navigate = useNavigate();

  const titleClass =
    candidate === "User"
      ? `${styles.title} ${styles.headerBar_user}`
      : `${styles.title} ${styles.headerBar_bondsman}`;

  const capitalizeFirst = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const startIndex = (page - 1) * limit;
  const currentPageData = data?.slice(startIndex, startIndex + limit) || [];
  const totalPages = Math.ceil((data?.length || 0) / limit);

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
      });
    } else {
      Swal.close();
    }
  }, [error]);

  const handleEdit = (id) => {
    const selectedItem = data.find((u) => u._id === id);

    if (candidate === "User") {
      navigate("/UpdateUser", {
        state: { user: selectedItem, candidate: "User" },
      });
    }

    if (candidate === "Bondsman") {
      navigate("/UpdateBondsman", {
        state: { bondsman: selectedItem, candidate: "Bondsman" },
      });
    }
  };

  // ---- OPEN POPUP WHEN DELETE CLICKED
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  // ---- DELETE CONFIRM LOGIC
  const confirmDelete = async () => {
    setOpen(false);
    setLoader(true);

    try {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axiosInstace.delete(`${deletAPI}/${deleteId}`);
      await fetchData();

      Swal.fire("Deleted!", "Record has been deleted.", "success");
    } catch (error) {
      settError(error?.response?.data?.message || "Something went wrong");
      Swal.fire("Error", "Unable to delete user", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.headerBar}>
          <h2 className={titleClass}>{listName}</h2>

          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
              <img src="/New-search.png" style={{ height: "24px", width: "25px" }} />
            </span>
            <input placeholder="Search by Name, Phone No..." />
          </div>
        </div>

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
                {currentPageData?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src="/table-profile.png"
                        style={{ height: "39px", width: "39px" }}
                      />
                    </td>

                    <td>{`${capitalizeFirst(
                      user.firstName || user.name
                    )} ${capitalizeFirst(user.middleName) || ""} ${capitalizeFirst(
                      user.lastName
                    )}`}</td>

                    <td>{user.email}</td>

                    <td>
                      {user.flag} {user.countryCode}
                      {user.phoneNo}
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
                        onClick={() => handleDeleteClick(user._id)}
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

        {data?.length > 0 && (
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ---- DELETE CONFIRM POPUP ---- */}
     <ConfirmPopup
  isOpen={open}
  title={`Delete`}  // dynamic title
  message={`Are you sure you want to delete this ${candidate.toLowerCase()}?`} // dynamic message
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => setOpen(false)}
  onConfirm={confirmDelete}
/>

    </div>
  );
};

export default DataTable;
