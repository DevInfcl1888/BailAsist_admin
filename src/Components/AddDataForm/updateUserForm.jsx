import React, { useState } from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import profileImg from "../../Assets/profile_pic.jpg";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstace from "../../utils/axiosInstance";

const UpdateUser = () => {
  const location = useLocation();
  const user = location.state?.user;
  console.log("user", user);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    street: user?.street || "",
    ZipCode: user?.ZipCode || "",
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstace.put(
        `/api/v1/bondsman/updateUserDetailsByBondsman/${user?._id}`,
        // "/api/v1/user/updateUserDetails",
        formData
      );

      Swal.fire("Success", "User updated successfully", "success");
    } catch (error) {
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
        <h2 className={styles.title}>Update user</h2>
        {/* <div className={styles.profileSection}>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />
          <button className={styles.editBtn}>✎</button>
        </div> */}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>
              First name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Middle name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Middle name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Last name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Phone number<span>*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your Phone number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Street<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Street name"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              ZipCode<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your ZipCode"
              name="ZipCode"
              value={formData.ZipCode}
              onChange={handleChange}
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

export default UpdateUser;
