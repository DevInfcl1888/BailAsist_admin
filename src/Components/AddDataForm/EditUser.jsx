// import React, { useState, useRef } from "react";
// import "./EditUserForm.css";
// import Sidebar from "../Sidebar/Sidebare";
// import { useLocation } from "react-router-dom";
// import axiosInstace from "../../utils/axiosInstance";
// import Swal from "sweetalert2";

// const EditUserForm = () => {
//     const { state } = useLocation(); 
//   const user = state?.user; 
//   const [formData, setFormData] = useState({
//     firstName: user?.firstName ?? "",
//     middleName: user?.middleName ?? "",
//     lastName: user?.lastName ?? "",
//     email: user?.email ?? "",
//     cellPhone: user?.phoneNo ?? "",
//   });


//   const [profileImage, setProfileImage] = useState(null);
//   const [profilePreview, setProfilePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef(null);

//   // Sidebar Toggle 
//   const [isSideOpen, setIsSideOpen] = useState(false);
//   const toggleSidebar = () => setIsSideOpen(!isSideOpen);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditIconClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     console.log("Profile image:", profileImage);
//   };


// const updateUser = async ()=>{
//    if (loading) return;
//   setLoading(true);
// try{
// const res = await axiosInstace.post(`/api/v1/admin/updateUserDetails/${user?._id}` ,
//   {
//     firstName:formData.firstName ,
//     middleName:formData.middleName ,
//     lastName:formData.lastName,
//     email:formData.email,
//     phoneNo:formData.cellPhone,
//     isActive:true,
//   }
// )
//       Swal.fire("Updated!", "User has been Updated.", "success");

// }catch(error){
// console.log(error)
//     Swal.fire("Error", "Upload failed. Please try again.", "error");

// }
//  setLoading(false);
// }



//   return (
//     <div className="page-layout">
//       {/* Sidebar Toggle Button */}

//       {/* Left Sidebar */}
//       <div className={`leftSideBar ${isSideOpen ? "open" : ""}`}>
//         <Sidebar />
//       </div>

//       {/* Overlay */}
//       {isSideOpen && <div className="overlay" onClick={toggleSidebar}></div>}

//       {/* Form Area */}
//       <div className="edit-user-container">
        
//         <div className="form-wrapper">
//          <div className="form-header">
//   <img
//     src="/back-button.png"
//     alt="Back"
//     className="back-button"
//     onClick={() => window.history.back()} // optional: navigate back
//   />
//   <h2 className="form-title">Edit User</h2>
// </div>


//           {/* Profile Image */}
//         <div className="profile-section">
//   <div className="profile-image-container">
    
//     <div className="profile-image-wrapper">
//       <img
//         src={profilePreview || "/boy.png"}
//         alt="Profile"
//         className="profile-image"
//       />
//     </div>

//     {/* ⬇️ ICON OUTSIDE of image wrapper */}
//     <div className="edit-icon" onClick={handleEditIconClick}>
//       <img src="/img-pen.png" style={{height:"14px" , width:"14px"}} />
//     </div>

//     <input
//       type="file"
//       ref={fileInputRef}
//       onChange={handleImageChange}
//       accept="image/*"
//       className="file-input"
//     />
//   </div>
// </div>


//           {/* Form */}
//           <form onSubmit={handleSubmit} className="edit-user-form">
//             <div className="name-row">
//               <div className="input-group">
//                 <label className="form-label">
//                   First Name <span className="required">*</span>
//                 </label>
//                 <input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Enter First Name"
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="input-group">
//                 <label className="form-label">Middle Name</label>
//                 <input
//                   name="middleName"
//                   value={formData.middleName}
//                   onChange={handleChange}
//                   placeholder="Enter Middle Name"
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             <div className="input-group">
//               <label className="form-label">
//                 Last Name <span className="required">*</span>
//               </label>
//               <input
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Enter Last Name"
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label className="form-label">
//                 Email Address <span className="required">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter Email Address"
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label className="form-label">
//                 Cell Phone Number <span className="required">*</span>
//               </label>
//               <input
//                 type="tel"
//                 name="cellPhone"
//                 value={formData.cellPhone}
//                 onChange={handleChange}
//                 placeholder="Enter Cell Phone Number"
//                 className="form-input"
//                 required
//               />
//             </div>

// <button 
//   type="submit" 
//   className="save-button" 
//   disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.cellPhone}
//   onClick={updateUser}
// >
//   {loading ? "Saving..." : "Save"}
// </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserForm;


import React, { useState, useRef, useEffect } from "react";
import "./EditUserForm.css";
import Sidebar from "../Sidebar/Sidebare";
import { useLocation } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import ReactCountryFlag from "react-country-flag";
import countryList from './countrycode.json'; // ← same file import

const EditUserForm = () => {
  const { state } = useLocation();
  const user = state?.user;

  // --------------------------
  // 🔵 Extract dial code + number from DB
  // --------------------------
  const extractPhone = (phone) => {
    if (!phone) return { code: "+1", number: "" };

    const sorted = [...countryList].sort(
      (a, b) => b.dial_code.length - a.dial_code.length
    );

    for (let c of sorted) {
      if (phone.startsWith(c.dial_code)) {
        return {
          code: c.dial_code,
          number: phone.replace(c.dial_code, ""),
          country: c,
        };
      }
    }

    return { code: "+1", number: phone, country: countryList[0] };
  };

  const extracted = extractPhone(user?.phoneNo);

  const [selectedCountry, setSelectedCountry] = useState(
    extracted.country || countryList[0]
  );

  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    middleName: user?.middleName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    cellPhone: extracted.number ?? "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownRef = useRef(null);

  // --------------------------
  // 🔵 Close dropdown on outside click
  // --------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   useEffect(() => {
    if (user?.countryCode) {
      const found = countryList.find(
        (c) => c.dial_code === user.countryCode
      );
      if (found) setSelectedCountry(found);
    }
  
    // cellPhone me phoneNo set krdo
    if (user?.phoneNo) {
      setFormData((prev) => ({
        ...prev,
        cellPhone: user.phoneNo
      }));
    }
  }, [user]);
  // --------------------------
  // IMAGE HANDLING
  // --------------------------
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditIconClick = () => fileInputRef.current.click();

 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,   // ← correct syntax
  });
};


  // --------------------------
  // UPDATE API CALL
  // --------------------------
  const [loading, setLoading] = useState(false);

const updateUser = async () => {
  if (loading) return;
  setLoading(true);

  const finalPhone = selectedCountry.dial_code + formData.cellPhone;

  // 🔵 Payload print in console
  const payload = {
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNo: formData.cellPhone,
    countryCode: selectedCountry.dial_code,   // ← Add THIS
    isActive: true,
  };

  console.log("Payload sending to API →", payload);

  try {
    await axiosInstace.post(
      `/api/v1/admin/updateUserDetails/${user?._id}`,
      payload
    );

    Swal.fire("Updated!", "User has been updated.", "success");
  } catch (error) {
    console.log(error);
    Swal.fire("Error", "Update failed. Please try again.", "error");
  }

  setLoading(false);
};


  return (
    <div className="page-layout">
      {/* Sidebar */}
      <div className={`leftSideBar`}>
        <Sidebar />
      </div>

      <div className="edit-user-container">
        <div className="form-wrapper">
          <div className="form-header">
             {!isMobile && (
            <img
              src="/back-button.png"
              alt="Back"
              className="back-button"
              onClick={() => window.history.back()}
            />
             )}
            <h2 className="form-title">Edit User</h2>
          </div>

          {/* PROFILE IMAGE */}
          <div className="profile-section">
            <div className="profile-image-container">
              <div className="profile-image-wrapper">
                <img
                  src={profilePreview || "/boy.png"}
                  alt="Profile"
                  className="profile-image"
                />
              </div>

              <div className="edit-icon" onClick={handleEditIconClick}>
                <img src="/img-pen.png" style={{ height: "14px", width: "14px" }} />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
            </div>
          </div>

          {/* FORM */}
          <form className="edit-user-form">
            {/* NAME FIELDS */}
            <div className="name-row">
              <div className="input-group">
                <label className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="form-label">Middle Name</label>
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Enter Middle Name"
                  className="form-input"
                />
              </div>
            </div>

            {/* LAST NAME */}
            <div className="input-group">
              <label className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="form-input"
              />
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="form-input"
                type="email"
              />
            </div>

            {/* PHONE INPUT (FLAG + CODE + INPUT) */}
           {/* PHONE INPUT (FLAG + CODE + INPUT) */}
<div className="input-group">
  <label className="form-label">
    Cell Phone Number <span className="required">*</span>
  </label>

  <div className="phone-box" ref={dropdownRef}>
    <div
      className="phone-left"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <ReactCountryFlag
        countryCode={selectedCountry.code}
        svg
        style={{ width: "22px", height: "22px", borderRadius: "4px" }}
      />

      <span className="dial">{selectedCountry.dial_code}</span>

      <img src="/Vector (7).png" style={{ height: 11, width: 7 }} />
    </div>

    <input
      name="cellPhone"
      value={formData.cellPhone}
      onChange={handleChange}
      className="phone-input"
      placeholder="Enter Phone Number"
    />

    {showDropdown && (
      <div className="dropdown">
        {countryList.map((c, i) => (
          <div
            key={i}
            className="dropdown-item"
            onClick={() => {
              setSelectedCountry(c);
              setShowDropdown(false);
            }}
          >
            <ReactCountryFlag
              countryCode={c.code}
              svg
              style={{ marginRight: 10 }}
            />
            {c.name} ({c.dial_code})
          </div>
        ))}
      </div>
    )}
  </div>
</div>


            {/* SAVE BUTTON */}
            <button className="save-button" disabled={loading} onClick={updateUser}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
