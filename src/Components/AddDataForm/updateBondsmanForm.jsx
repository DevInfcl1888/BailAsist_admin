import React, { useState, useRef } from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import { useLocation } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";

const UpdateBondsman = () => {
  const { state } = useLocation();
  const user = state?.bondsman;

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phoneNo ?? "",
    email: user?.email ?? "",
    cellPhone: user?.phoneNo ?? "",
  });

  // ---------------- HANDLE UPDATE API ----------------
  const handleUpload = async (e) => {
    e.preventDefault();
    if (loading) return ;
    setLoading(true)

    try {
      const res = await axiosInstace.post(
        `/api/v1/admin/updateBondsmanDetails/${user?._id}`,
        {
          name: formData.name,
          email: formData.email,
          phoneNo: formData.phone, // API me phoneNo required hai
        }
      );

      console.log("Update successful", res.data);
      Swal.fire("Updated!", "User has been Updated.", "success");

    } catch (error) {
      console.log(error);
    Swal.fire("Error", "Upload failed. Please try again.", "error");
    }
    setLoading(false)
  };
  // ----------------------------------------------------

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.cellPhone.trim() !== "";

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Sidebar />

      <h2 className={styles.title}>Update Bondsman Info</h2>

      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <div className={styles.profileImageWrapper}>
            <img
              src={profilePreview || "/boy.png"}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>

          <div
            className={styles.editIcon}
            onClick={() => fileInputRef.current.click()}
          >
            <img src="/img-pen.png" style={{ width: "14px", height: "14px" }} />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className={styles.fileInput}
          />
        </div>
      </div>

      <form className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <label>Full Name *</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email *</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Cell Phone *</label>
          <input
            type="text"
            placeholder="*******"
            name="cellPhone"
            onChange={handleInputChange}
            value={formData.cellPhone}
          />
        </div>

        <button
          className={styles.saveBtn}
          disabled={!isFormValid}
          onClick={handleUpload}
        >
          {loading ? "Updaing..." :"Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBondsman;
