import React, { useState, useRef ,useEffect } from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import { useLocation } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import ReactCountryFlag from "react-country-flag";
import countries from './countrycode.json';

// const countries = [
//   { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
//   { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
//   { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
//   { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" }
// ];

const UpdateBondsman = () => {
  const { state } = useLocation();
  const user = state?.bondsman;
 
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[233]);
const [showDropdown, setShowDropdown] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phoneNo ?? "",
    email: user?.email ?? "",
    cellPhone: user?.phoneNo ?? "",
  });



  // ---------------- HANDLE UPDATE API ----------------
 const handleUpload = async (e) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true);

  // ---- FINAL PAYLOAD OBJECT ----
  const payload = {
    name: formData.name,
    email: formData.email,
    phoneNo: formData.cellPhone,    // Phone number
    countryCode: selectedCountry.dial_code,   // +1 , +91 , +987 etc.
  };

  console.log("📤 FINAL PAYLOAD SENDING TO API:", payload);

  try {
    const res = await axiosInstace.post(
      `/api/v1/admin/updateBondsmanDetails/${user?._id}`,
      payload
    );

    console.log("✅ Update successful", res.data);
    Swal.fire("Updated!", "User has been Updated.", "success");

  } catch (error) {
    console.log("❌ API ERROR:", error);
    Swal.fire("Error", "Upload failed. Please try again.", "error");
  }

  setLoading(false);
};

  // ----------------------------------------------------
  useEffect(() => {
  if (user?.countryCode) {
    const found = countries.find(
      (c) => c.dial_code === user.countryCode
    );
    if (found) setSelectedCountry(found);
  }

  // cellPhone me phoneNo set krdo
  if (user?.phoneNo) {
    setFormData((prev) => ({
      ...prev,
      cellPhone: user.phoneNo
    }));
  }
}, [user]);


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
      
  <div className={styles.header}>
  {!isMobile && (
    <img
      src="/back-button.png"
      alt="Back"
      className={styles.backButton}
      onClick={() => window.history.back()}
    />
  )}

  <h2 className={styles.title}>Update Bondsman Info</h2>
</div>

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

  <div className={styles.phoneContainer}>
    <div
      className={styles.countrySelector}
      onClick={() => setShowDropdown(!showDropdown)}
    >
<div className={styles.flag}>
  <ReactCountryFlag
    countryCode={selectedCountry.code}  // ex: GB
    svg
    style={{
      width: "22px",
      height: "22px",
      borderRadius: "4px",
    }}
  />
</div>
      <span className={styles.code}>{selectedCountry.dial_code}</span>
      <span className={styles.arrow}><img src="/Vector (7).png" style={{height:"11px" , width:"7px"}} /></span>
    </div>
    <input
      type="text"
      placeholder="(000) 000-0000"
      name="cellPhone"
      onChange={handleInputChange}
      value={formData.cellPhone}
      className={styles.phoneInput}
      style={{border:"none"}}
    />
  </div>

  {showDropdown && (
    <div className={styles.dropdown}>
      {countries.map((c) => (
        <div
          key={c.code}
          className={styles.dropdownItem}
          onClick={() => {
            setSelectedCountry(c);
            setShowDropdown(false);
          }}
        >
          {c.flag} {c.name} ({c.dial_code})
        </div>
      ))}
    </div>
  )}
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
