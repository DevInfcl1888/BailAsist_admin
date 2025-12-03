import React, { useState } from "react";
import styles from "./AdminLogin.module.css";
import logo from "../../Assets/logo.png";
import axiosInstace from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Swal.fire({
    //   title: "Loading...",
    //   text: "Please wait",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    try {
      const res = await axiosInstace.post(`api/v1/admin/adminLogin`, {
        username,
        password,
      });

      Swal.close();

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      navigate("/dashboard");
   } catch (error) {
  Swal.close();

  // Always show "Wrong ID or Password" on invalid login
  const message =
    error.response?.status === 401
      ? "Wrong ID or Password"
      : error.response?.data?.message || "Something went wrong. Please try again.";

  setError(message);

  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: message,
  });

  console.log("Error:", error);
} finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <img src={logo} alt="Admin Logo" className={styles.adminLogo} />

        <div className={styles.adminLoginContainer}>
          <h1>Admin Login</h1>

          <div className={styles.loginBox}>
            <p>Please fill in your unique admin login details below</p>

            {/* SHOW ERROR BELOW TITLE */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>
                  Username <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Password <span style={{ color: "red" }}>*</span>
                </label>

                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    maxLength={10}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    className={styles.toggleEye}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? "/open-eye.png" : "/close-eye.png"}
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      style={{ width: "28px", height: "22px", cursor: "pointer" }}
                    />
                  </span>
                </div>
              </div>

              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
