import React from "react";
import clsx from "clsx"; // helps combine multiple class names
import styles from "./Header.module.css";

/**
 * Reusable HeaderBar component
 * Props:
 *  - listName: heading text (like "Bondsman User List")
 *  - candidate: add button text (like "Bondsman" or "User")
 *  - customClass: extra CSS module class for page-specific overrides
 *  - style: optional inline styles
 */
const HeaderBar = ({ listName, candidate, customClass, style }) => {
  return (
    <div className={clsx(styles.headerBar, customClass)} style={style}>
      <h2 className={styles.title}>{listName}</h2>

      <div className={styles.rightSide}>
        <div className={styles.searchBox}>
          <input placeholder="Search by Name, Phone No" />
        </div>
        <button className={styles.addBtn}>➕ Add {candidate}</button>
      </div>
    </div>
  );
};

// const HeaderBar = ({ customClass, listName, candidate }) => {
//   return (
//     <div className={`${styles.headerBar} ${customClass}`}>
//       <h2 className={styles.title}>{listName}</h2>

//       <div className={styles.rightSide}>
//         <div className={styles.searchBox}>
//           <input type="text" placeholder="Search by Name, Phone No..." />
//         </div>

//         <button className={styles.addBtn}>Add {candidate}</button>
//       </div>
//     </div>
//   );
// };

export default HeaderBar;
