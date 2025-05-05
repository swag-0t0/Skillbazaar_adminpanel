import React, { useState } from "react";
import "./Profile.scss";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Fetch user data
  const { isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await api.get(`/moderators/single/${id}`);
      const userData = response.data;
      console.log("Fetched user data:", userData);
      
      // Directly set form data with fetched data
      setFormData({
        image: userData.image || "",
        fullname: userData.fullname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        role: userData.role || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      return userData;
    }
  });

  // Handle image change without upload endpoint
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setError("Image size must be less than 5MB");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          // Check base64 string size
          if (base64String.length > (10 * 1024 * 1024)) { 
            setError("Processed image is too large");
            return;
          }
          setFormData(prev => ({ ...prev, image: base64String }));
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError("Error processing image");
      }
    }
  };

  // Update mutation with navigation and alert
  const updateMutation = useMutation({
    mutationFn: (updateData) => {
      // Send base64 image directly in the update request
      return api.put(`/moderators/update/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", id]);
      queryClient.invalidateQueries(["adminProfile"]);
      setError(null);
      
      // Show alert and navigate
      alert("Profile updated successfully!");
      navigate("/");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Update failed");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("New passwordsnot match!");
      return;
    }

    const updateData = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      image: formData.image,
      ...(formData.newPassword && {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })
    };

    updateMutation.mutate(updateData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="profilePage">
      {error && <div className="error">{error}</div>}
      <div className="profileContainer">
        <div className="profileCard">
          <div className="profileImageSection">
            <img 
              src={formData.image}
              alt={formData.fullname || "Profile"} 
              className="profileImage" 
            />
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
              name="fullname"
              value={formData.fullname}
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

            <button 
              onClick={handleUpdate} 
              className="updateBtn"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
