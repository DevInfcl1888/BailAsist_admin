import React, { useState, useRef } from "react";
import "./EditUserForm.css";
import Sidebar from "../Sidebar/Sidebare";
import { useLocation } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";
import Swal from "sweetalert2";

const EditUserForm = () => {
    const { state } = useLocation(); 
  const user = state?.user; 
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    middleName: user?.middleName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    cellPhone: user?.phoneNo ?? "",
  });


  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Sidebar Toggle 
  const [isSideOpen, setIsSideOpen] = useState(false);
  const toggleSidebar = () => setIsSideOpen(!isSideOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Profile image:", profileImage);
  };


const updateUser = async ()=>{
   if (loading) return;
  setLoading(true);
try{
const res = await axiosInstace.post(`/api/v1/admin/updateUserDetails/${user?._id}` ,
  {
    firstName:formData.firstName ,
    middleName:formData.middleName ,
    lastName:formData.lastName,
    email:formData.email,
    phoneNo:formData.cellPhone,
    isActive:true,
  }
)
      Swal.fire("Updated!", "User has been Updated.", "success");

}catch(error){
console.log(error)
    Swal.fire("Error", "Upload failed. Please try again.", "error");

}
 setLoading(false);
}



  return (
    <div className="page-layout">
      {/* Sidebar Toggle Button */}

      {/* Left Sidebar */}
      <div className={`leftSideBar ${isSideOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* Overlay */}
      {isSideOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Form Area */}
      <div className="edit-user-container">
        <div className="form-wrapper">
          <h2 className="form-title">Edit User</h2>

          {/* Profile Image */}
        <div className="profile-section">
  <div className="profile-image-container">
    
    <div className="profile-image-wrapper">
      <img
        src={profilePreview || "/boy.png"}
        alt="Profile"
        className="profile-image"
      />
    </div>

    {/* ⬇️ ICON OUTSIDE of image wrapper */}
    <div className="edit-icon" onClick={handleEditIconClick}>
      <img src="/img-pen.png" style={{height:"14px" , width:"14px"}} />
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


          {/* Form */}
          <form onSubmit={handleSubmit} className="edit-user-form">
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
                  required
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
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">
                Cell Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="cellPhone"
                value={formData.cellPhone}
                onChange={handleChange}
                placeholder="Enter Cell Phone Number"
                className="form-input"
                required
              />
            </div>

<button 
  type="submit" 
  className="save-button" 
  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.cellPhone}
  onClick={updateUser}
>
  {loading ? "Saving..." : "Save"}
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
