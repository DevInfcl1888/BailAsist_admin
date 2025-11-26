import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstace from "./axiosInstance";
import Swal from "sweetalert2";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthtenticate, setIsAuthenticate] = useState(null);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await axiosInstace.get("/api/v1/admin/verifyToken");
        if (!res.data.authenticated) {
          setIsAuthenticate(false);
          return;
        }
        setIsAuthenticate(true);
      } catch (error) {
        setIsAuthenticate(false);
      } finally {
        setLoading(false); // <-- loader OFF after API
      }
    };

    checkAuth();
  }, []);

  if (isAuthtenticate === null) return <> </>;

  return isAuthtenticate ? children : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
