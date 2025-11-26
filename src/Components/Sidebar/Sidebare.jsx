import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.png"; // adjust path to your logo
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import DataTable from "../DataTable/DataTable";

const Sidebar = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const userHandleClick = async (e) => {
    console.log("dfsdfsg");
    // e.preventDefault();
    setLoader(true);
    // if (loader) {
    //   Swal.fire({
    //     title: "Data loading...",
    //     text: "Please wait",
    //     allowOutsideClick: false,
    //     didOpen: () => {
    //       Swal.showLoading();
    //     },
    //   });
    // }
    try {
      const res = await axiosInstace.get("/api/v1/admin/getAllUsers");
      setUsers(res);
      setLoader(false);
      if (!loader) Swal.close();
      <DataTable
        candidate={"User"}
        listName="User List"
        data={res?.data?.User}
        error={error}
        loading={loader}
        // onAddClick={() => handleUserAddClick("User")}
        // fetchData={fetchData}
        // deletAPI={"/api/v1/admin/deleteUserProfile"}
      />;
      console.log(res?.data?.User)
    } catch (error) {
      console.log(error);
      setLoader(false);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error"
      );
    }
  };
  // const bondsmanHandleClick axiosInstace.get("/api/v1/admin/getBondsmanDetails"),
  console.log(users);
  const handleLogout = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (loader) {
      Swal.fire({
        title: "Logout...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    try {
      const res = await axiosInstace.post("/api/v1/admin/adminLogout", {});
      localStorage.removeItem("accessToken");
      console.log("res", res);
      if (res.status === 200) {
        setLoader(false);
        if (!loader) Swal.close();
        navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
      console.log(err?.response?.data?.message);
      setLoader(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.divImg}>
        <img src={logo} height={"180px"} alt="" />
        <Button
          onLogout={handleLogout}
          onUserClick={userHandleClick}
          // onBondsmanClick={bondsmanHandleClick}
        />
        <p style={{ color: "red" }}>{error?.response?.data.message}</p>
      </div>
    </>
  );
};

export default Sidebar;
