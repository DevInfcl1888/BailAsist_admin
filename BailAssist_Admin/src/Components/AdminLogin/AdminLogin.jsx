import React, { useState } from "react";
import "./AdminLogin.css"; // 👈 CSS import
import logo from "../../Assets/logo.jpg";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
  };

  return (
    <>
      <img src={logo} alt="Admin Logo" className="admin-logo" />
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        <div className="login-box">
          {/* rest of form */}

          <div className="admin-login-container">
            {/* Logo */}

            {/* Login Box */}
            <h1>Admin Login</h1>
            <div className="login-box">
              <p>Please fill in your unique admin login details below</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Login <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
