import React, { useState, useEffect } from "react";
import styles from "./ContactUs.module.css";
import Sidebar from "../Sidebar/Sidebare";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";

export default function ContactUsScreen() {
  const [text, setText] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // skeleton loader flag

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  useEffect(() => {
    fetchContactUs();
  }, []);

  const fetchContactUs = async () => {
    try {
      setFetching(true);
      const res = await axiosInstace.get("/api/v1/admin/contactUs");
      const savedText = res?.data?.contactUs?.text || "";
      setText(savedText);
    } catch (error) {
      console.log("Error fetching Contact Us:", error);
    } finally {
      setFetching(false);
    }
  };

  const saveContactUs = async () => {
    try {
      setLoading(true);
      const payload = { text };
      await axiosInstace.post("/api/v1/admin/contactUs", payload);
      Swal.fire("Updated!", "Contact Us has been Updated.", "success");
    } catch (error) {
      console.log("Error saving Contact Us:", error);
      alert("Failed to save. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Component
  const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonTitle}></div>
      
      <div className={styles.skeletonTextarea}></div>
      
      <div className={styles.skeletonMetaRow}>
        <div className={styles.skeletonCounts}></div>
        <div className={styles.skeletonActions}>
          <div className={styles.skeletonDeleteBtn}></div>
          <div className={styles.skeletonSaveBtn}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {/* Left Sidebar */}
      <div className={`${styles.leftSideBar} ${isSideOpen ? styles.open : ""}`}>
        <Sidebar />
      </div>

      {/* Main Card */}
      <div className={styles.card}>
        {fetching ? (
          <SkeletonLoader />
        ) : (
          <>
            <h1 className={styles.title}>Contact Us Editor</h1>

            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your message here..."
              rows={8}
            />

            <div className={styles.metaRow}>
              <div className={styles.counts}>
                {`${words} words — ${chars} characters`}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setText("")}
                  disabled={loading || fetching}
                >
                  Delete
                </button>

                <button
                  className={styles.saveBtn}
                  onClick={saveContactUs}
                  disabled={loading || fetching}
                >
                  {loading ? "Saving..." : "Save Contact"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}