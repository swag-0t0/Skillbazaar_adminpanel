import React, { useState } from "react";
import "./Profile.scss";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
const Profile = () => {
  const [formData, setFormData] = useState({
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    name: "Swagoto Das",
    email: "swagoto@example.com",
    phone: "017XXXXXXXX",
    address: "Dhaka, Bangladesh",
    role: "Admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleUpdate = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Profile updated!");
  };

  return (
    <div className="profilePage">
      <div className="profileContainer">
        <div className="profileCard">
          <div className="profileImageSection">
            <img src={formData.image} alt="profile" className="profileImage" />
            <label htmlFor="fileInput" className="uploadLabel">
              <FileUploadOutlinedIcon className="uploadIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div className="profileForm">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button onClick={handleUpdate} className="updateBtn">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
