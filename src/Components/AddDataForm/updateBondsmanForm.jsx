import React from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import profileImg from "../../Assets/profile_pic.jpg";
import { useLocation } from "react-router-dom";

const updateBondsmanForm = () => {
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
              Bondsman name<span>*</span>
            </label>
            <input type="text" placeholder="Enter Bondsman name" name="name" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Phone no<span>*</span>
            </label>
            <input type="tel" placeholder="Enter your Phone number" name="phoneNo" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Email<span>*</span>
            </label>
            <input type="email" placeholder="Enter your Email" name="email" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Password<span>*</span>
            </label>
            <input type="password" placeholder="Enter your Password" name="password" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Country code <span>*</span>
            </label>
            <input type="text" placeholder="Enter your Country code" name="countryCode" />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Address <span>*</span>
            </label>
            <input type="text" placeholder="Enter your Full address" name="address" />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default updateBondsmanForm;
