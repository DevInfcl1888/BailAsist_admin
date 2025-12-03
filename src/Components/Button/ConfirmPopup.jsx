import React from "react";
import styles from "./confirm.module.css"; // change filename if needed

const ConfirmPopup = ({
  title = "Logout",
  message = "Are you sure you want to logout?",
  cancelText = "Cancel",
  confirmText = "Logout",
  onCancel,
  onConfirm,
  isOpen
}) => {
  if (!isOpen) return null;

  // Clicking on backdrop triggers onCancel
  const handleBackdropClick = () => {
    onCancel && onCancel();
  };

  // Prevent click inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {message}
        </div>

        <div className={styles.bodyDivider}></div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmPopup;
