import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import Sidebar from "../Sidebar/Sidebare";

export default function ContactUsScreen() {
  const [text, setText] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  return (
    <div className={styles.wrapper}>
      {/* Left Sidebar */}
      <div className={`${styles.leftSideBar} ${isSideOpen ? styles.open : ""}`}>
        <Sidebar />
      </div>

      {/* Main Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>Contact US Editor</h1>

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
              onClick={() => alert("Saved: " + text)}
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
