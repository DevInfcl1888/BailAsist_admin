import React, { useState } from "react";
import styles from "./AdminLogin.module.css"; // 👈 CSS import
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
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await axiosInstace.post(`api/v1/admin/adminLogin`, {
        username,
        password,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      console.log("login success", res);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data.message) {
        setError(error.response?.data.message);
        setLoading(false);
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }

      console.log("Error", error);
      console.log("error.response?.data.message", error.response?.data.message);
    } finally {
      setLoading(false);
    }
    console.log("Username:", username, "Password:", password);
  };

  return (
    <>
      <div className={styles.container}>
        <img src={logo} alt="Admin Logo" className={styles.adminLogo} />
        <div className={styles.adminLoginContainer}>
          <h1>Admin Login</h1>
          <div className={styles.loginBox}>
            <p>Please fill in your unique admin login details below</p>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>
                  Login{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
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
                  Password{" "}
                  <span style={{ color: "red" }} className="required">
                    *
                  </span>
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
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>
              <button type="submit" className={styles.button}>
                {/* {loading ? (
                  <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                  </div>
                ) : (
                  "Submit"
                )} */}
                Sumbit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
