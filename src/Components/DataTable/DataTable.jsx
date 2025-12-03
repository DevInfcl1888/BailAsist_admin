import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    setOpen(false);
    setLoader(true);
    try {
      await axiosInstace.delete(`${deletAPI}/${deleteId}`);
      await fetchData();
    } catch (error) {
      settError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  // Skeleton loader row
  const renderSkeletonRow = () => {
    return (
      <tr>
        {Array.from({ length: 6 }).map((_, idx) => (
          <td key={idx}>
            <div
              style={{
                height: "20px",
                background:
                  "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                borderRadius: "4px",
                animation: "shimmer 1.5s infinite",
              }}
            ></div>
          </td>
        ))}
      </tr>
    );
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
            {loading
              ? Array.from({ length: limit }).map((_, idx) => renderSkeletonRow(idx))
              : !data || data.length === 0
              ? <tr><td colSpan={6}><NoData message={`No ${candidate} Found`} /></td></tr>
              : currentPageData.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src="/table-profile.png"
                        style={{ height: "39px", width: "39px" }}
                      />
                    </td>
                   <td>
  {(() => {
    const fullName = `${capitalizeFirst(user.firstName || user.name)} ${
      capitalizeFirst(user.middleName) || ""
    } ${capitalizeFirst(user.lastName)}`.trim();

    return fullName.length > 10 ? fullName.slice(0, 10) + "..." : fullName;
  })()}
</td>


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

      <ConfirmPopup
        isOpen={open}
        title={`Delete`}
        message={`Are you sure you want to delete this ${candidate.toLowerCase()}?`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Skeleton shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default DataTable;
