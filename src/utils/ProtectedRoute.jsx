import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstace from "./axiosInstance";

function ProtectedRoute({ children }) {
  const [isAuthtenticate, setIsAuthenticate] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstace.get("/api/v1/admin/verifyToken", {
          withCredentials: true, // allow cookies
        });
        setIsAuthenticate(true);
      } catch (error) {
        setIsAuthenticate(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthtenticate === null) return <div>Loading...</div>;

  return isAuthtenticate ? children : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
