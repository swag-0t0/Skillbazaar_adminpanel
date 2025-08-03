import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import "./Moderators.scss";
import { Delete,Email, Person,LockClockOutlined} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Moderators = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "moderator",
  });

  // Get current user role
  const { data: currentUser } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: () => api.get("/auth/verify").then((res) => res.data.user),
  });

  // Fetch moderators
  const { data: moderators = [],isLoading } = useQuery({
    queryKey: ["moderators"],
    queryFn: () => api.get("/moderators/list").then((res) => res.data),
    enabled: currentUser?.role === "admin",
  });

  // Add moderator mutation
  const addModeratorMutation = useMutation({
    mutationFn: (newModerator) => api.post("/moderators/create", newModerator),
    onSuccess: () => {
      queryClient.invalidateQueries(["moderators"]);
      setFormData({ fullname: "", email: "", password: "", role: "moderator" });
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Error adding moderator");
    },
  });

  // Delete moderator mutation
  const deleteModeratorMutation = useMutation({
    mutationFn: (id) => api.delete(`/moderators/remove/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["moderators"]);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Error deleting moderator");
    },
  });

  // Redirect if not admin
  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addModeratorMutation.mutate(formData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this moderator?")) {
      deleteModeratorMutation.mutate(id);
    }
  };

  // Show loading state while checking role
  if (!currentUser) return <div>Loading...</div>;

  // Only render for admin role
  if (currentUser.role !== "admin") return null;


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="moderatorsPage">
      <div className="moderatorsSection">
        {error && <div className="error">{error}</div>}

        <div className="addModeratorCard">
          <h2>
            Add Moderator
          </h2>
          <form className="moderatorForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <Person />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="formGroup">
              <Email />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="formGroup">
              <LockClockOutlined />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                required
              />
            </div>
            <button
              type="submit"
              className="addBtn"
              disabled={addModeratorMutation.isLoading}
            >
              {addModeratorMutation.isLoading ? "Adding..." : "Add Moderator"}
            </button>
          </form>
        </div>

        <div className="moderatorsTableContainer">
          <h2>Moderators</h2>
          <table className="moderatorsTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((mod) => (
                <tr key={mod._id}>
                  <td>
                    <img
                      src={mod.image || "https://example.com/default.jpg"}
                      alt={mod.fullname}
                      className="modAvatar"
                    />
                  </td>
                  <td>{mod.fullname}</td>
                  <td>{mod.email}</td>
                  <td>{mod.role}</td>
                  <td>
                    <Delete
                      className="deleteIcon"
                      onClick={() => handleDelete(mod._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Moderators;