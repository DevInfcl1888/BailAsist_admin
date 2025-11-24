import React from "react";
import styles from "./AddUserForm.module.css";
import Sidebar from "../Sidebar/Sidebare";
import profileImg from "../../Assets/profile_pic.jpg";
import { useLocation } from "react-router-dom";

const AddUser = () => {
  const location = useLocation();
  const candidate = location.state?.candidate;

  const submitForm = (e)=>{
    e.preventDefault();
    
    // api/v1/user/registration

  }
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
              First name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your First name"
              name="firstName"
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
            />
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
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Confirm password<span>*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Confirm password"
              name="confirmPassword"
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
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Home address<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Home address"
              name="homeAddress"
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
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Country code<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Country code"
              name="countryCode"
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
            />
          </div>

          <button type="submit" className={styles.saveBtn} onClick={submitForm}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
