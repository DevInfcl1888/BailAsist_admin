import React, { useEffect, useState } from "react";
import styles from "./Privacy.module.css";
import Sidebar from "../Sidebar/Sidebare";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function Privacy() {
  const [text, setText] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  // Load existing privacy policy on mount
  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const res = await axiosInstace.get("/api/v1/admin/privacyPolicy");

      const savedText = res?.data?.privacyPolicy?.text || "";
      setText(savedText);
    } catch (error) {
      console.log("Error fetching privacy policy:", error);
    }
  };

  const savePrivacyPolicy = async () => {
    try {
      setLoading(true);

      const payload = { text };

      const res = await axiosInstace.post("/api/v1/admin/privacyPolicy", payload);

      // alert("Privacy Policy saved successfully!");
            Swal.fire("Updated!", "Privacy Policy saved successfully!", "success");

      setLoading(false);
    } catch (error) {
      // console.log("Error saving privacy policy:", error);
      // alert("Failed to save. Check console.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Left Sidebar */}
      <div className={`${styles.leftSideBar} ${isSideOpen ? styles.open : ""}`}>
        <Sidebar />
      </div>

      {/* Main Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>Privacy Policy</h1>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message here..."
        />

        <div className={styles.metaRow}>
          {/* Word & Character Counts */}
          {/* <div className={styles.counts}>
            {words} words — {chars} characters
          </div> */}

          <div className={styles.actions}>
            <button
              className={styles.saveBtn}
              onClick={savePrivacyPolicy}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
