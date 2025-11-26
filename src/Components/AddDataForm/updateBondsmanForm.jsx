import React from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import profileImg from "../../Assets/profile_pic.jpg";
import { useLocation } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateBondsmanForm = () => {
  const location = useLocation();
  const candidate = location.state?.candidate;
  const bondsman = location.state?.bondsman;

  const [formData, setFormData] = useState({
    name: bondsman?.name || "",
    email: bondsman?.email || "",
    phoneNo: bondsman?.phoneNo || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstace.post(
        `/api/v1/admin/updateBondsmanDetails/${bondsman?._id}`,
        formData
      );
      Swal.fire("Success", "Bondsman updated successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error"
      );
    }
  };
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Add {candidate}</h2>
        <div className={styles.profileSection}>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />
          <button className={styles.editBtn}>✎</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>
              Bondsman name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Bondsman name"
              name="name"
              onChange={handleChange}
              value={formData?.name}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>
              Email<span>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={handleChange}
              value={formData?.email}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>
              Phone no<span>*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your Phone number"
              name="phoneNo"
              onChange={handleChange}
              value={formData?.phoneNo}
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBondsmanForm;
