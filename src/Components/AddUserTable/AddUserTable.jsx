import React from "react";
import styles from "./AddUserTable.module.css";
import Sidebar from "../Sidebar/Sidebare";
import profileImg from "../../Assets/profile_pic.jpg";
import { useLocation } from "react-router-dom";

const AddUser = () => {
  const location = useLocation();
  const candidate = location.state?.candidate;
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Add {candidate}</h2>
        <div className={styles.profileSection}>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />
          <button className={styles.editBtn}>✎</button>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>
              Username<span>*</span>
            </label>
            <input type="text" placeholder="Enter your Username" name="" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Email<span>*</span>
            </label>
            <input type="email" placeholder="Enter your Email" name="" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Phone Number<span>*</span>
            </label>
            <input type="tel" placeholder="Enter your Phone Number" name="" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Status<span>*</span>
            </label>
            <input type="text" placeholder="Enter your Status" name="" />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
