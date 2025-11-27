import React, { useState, useRef } from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";

const UpdateBondsman = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isSideOpen, setIsSideOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cellPhone: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
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
          <label>Full Name <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleInputChange}
                              className="form-input"

          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number<span className="required">*</span></label>
          <input
            type="text"
            placeholder="Enter Phone"
            name="phone"
            onChange={handleInputChange}
                              className="form-input"

          />
        </div>

        <div className={styles.formGroup}>
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleInputChange}
                              className="form-input"

          />
        </div>

        <div className={styles.formGroup}>
          <label>Cell Phone Number <span className="required">*</span></label>
          <input
            type="text"
            placeholder="*******"
            name="cellPhone"
            onChange={handleInputChange}
                              className="form-input"

          />
        </div>

        <button className={styles.saveBtn} disabled={!isFormValid}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBondsman;
