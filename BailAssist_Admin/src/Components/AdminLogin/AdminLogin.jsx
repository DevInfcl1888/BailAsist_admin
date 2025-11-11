import React, { useState } from "react";
import styles from "./AdminLogin.module.css"; // 👈 CSS import
import logo from "../../Assets/logo.jpg";
import axiosInstace from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosInstace.post(
        `api/v1/admin/adminLogin`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      console.log("login success", res);
      if (res.status === 200) {
        alert("Login success");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.log("Error", error);
      console.log("error.response?.data.message", error.response?.data.message);
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
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
