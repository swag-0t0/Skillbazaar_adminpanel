import React, { useState } from "react";
import "./Users.scss";
import { DeleteOutline, SearchOutlined } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 9;

  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await api.get("/home/users");
      return response.data;
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      await api.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]); // Refetch users after deletion
    },
    onError: (err) => {
      console.error("Error deleting user:", err);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || // Handle cases where email might be undefined
    (user.isSeller ? "freelancer" : "buyer").includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <div className="usersPage">
      <div className="usersContainer">
        <h2 className="usersTitle">All Users</h2>
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="Search by name, email, or role"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page on search
            }}
          />
        </div>

        <table className="usersTable">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Profile Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className={index % 2 === 1 ? "altRow" : ""}>
                <td>
                  <img
                    src={user.img || "../../../img/person.png"}
                    className="userAvatar"
                    alt={user.username}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.isSeller ? "Freelancer" : "Buyer"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <DeleteOutline
                    className="deleteIcon"
                    onClick={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
