import React, { useState, useEffect } from "react";
import styles from "./ContactUs.module.css";
import Sidebar from "../Sidebar/Sidebare";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function ContactUsScreen() {
  const [text, setText] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  // Fetch saved Contact Us text on mount
  useEffect(() => {
    fetchContactUs();
  }, []);

 const fetchContactUs = async () => {
  try {
    const res = await axiosInstace.get("/api/v1/admin/contactUs");

    const savedText = res?.data?.contactUs?.text || "";

    setText(savedText);
  } catch (error) {
    console.log("Error fetching Contact Us:", error);
  }
};


  const saveContactUs = async () => {
    try {
      setLoading(true);

      const payload = { text };

      const res = await axiosInstace.post("/api/v1/admin/contactUs", payload);

      Swal.fire("Updated!", "Contact Us has been Updated.", "success");
      setLoading(false);
    } catch (error) {
      console.log("Error saving Contact Us:", error);
      alert("Failed to save. Check console for details.");
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
        <h1 className={styles.title}>Contact Us Editor</h1>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message here..."
        />

        <div className={styles.metaRow}>
          <div className={styles.counts}>{words} words — {chars} characters</div>

          <div className={styles.actions}>
            <button
              className={styles.deleteBtn}
              onClick={() => setText("")}
            >
              Delete
            </button>

            <button
              className={styles.saveBtn}
              onClick={saveContactUs}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Contact"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
