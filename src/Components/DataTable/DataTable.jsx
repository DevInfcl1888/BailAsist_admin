import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import styles from "./DataTable.module.css";
import NoData from "../CustomMessage/CustomMessage";
import axiosInstace from "../../utils/axiosInstance";
import { confirmDialog } from "../../utils/notificationToast";
import { useNavigate } from "react-router-dom";

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
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // rows per page
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
        footer: '<a href="#">Why do I have this issue?</a>',
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

      const res = await axiosInstace.delete(`${deletAPI}/${id}`);
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
    <div className={styles.pageWrapper}>
      <div className={styles.headerBar}>
        <h2 className={titleClass}>{listName}</h2>
        <div className={styles.searchBox}>
          <input placeholder="Search by Name, Phone No" />
        </div>
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
                {currentPageData?.map((user) => (
                  <tr key={user._id}>
                    <td>👤</td>
                    <td>{`${
                      capitalizeFirst(user.firstName || user.name) || " "
                    } ${capitalizeFirst(user.middleName) || " "} ${
                      capitalizeFirst(user.lastName) || " "
                    }`}</td>

                    <td>{user.email || " "}</td>
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
      {/* ---------------- PAGINATION UI ---------------- */}
      {data?.length > 0 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? styles.activePage : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
