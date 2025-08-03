import React, { useState } from "react";
import "./WidgetSm.scss";
import { Visibility, Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";

const WidgetSm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await api.get("/home/users");
      //console.log("Fetched users:", response.data); 
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser) || [];
  const totalPages = Math.ceil((users?.length || 0) / usersPerPage);

  // Function to handle view button click
  const handleViewClick = (user) => {
    setSelectedUser(user);
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setSelectedUser(null);
  };

  return (
    <div className="widgetSm">
      <h3 className="widgetSmTitle">Recent Users</h3>
      <ul className="widgetSmList">
        {currentUsers.map((user, i) => (
          <li className="widgetSmListItem" key={i}>
            <img
              src={user?.img || "../../../img/person.png"}
              alt={user?.username}
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user?.username || "Unknown"}</span>
              <span className="widgetSmUserTitle">
                {user.isSeller ? "Freelancer" : "General User"}
              </span>
            </div>
            <button 
              className="widgetSmButton"
              onClick={() => handleViewClick(user)}
            >
              <Visibility className="widgetSmIcon" />
              View
            </button>
          </li>
        ))}
      </ul>

      {/* User Details Dialog */}
      {selectedUser && (
        <div className="dialogOverlay">
          <div className="dialogContent">
            <div className="dialogHeader">
              <h3>User Details</h3>
              <button className="closeButton" onClick={handleCloseDialog}>
                <Close />
              </button>
            </div>
            <div className="dialogBody">
              <div className="userHeader">
                <div className="imageWrapper">
                  <img 
                    src={selectedUser?.img || "../../../img/person.png"} 
                    alt={selectedUser?.username}
                    className="userDetailImg"
                  />
                  <div className="userType">
                    {selectedUser.isSeller ? "Freelancer" : "General User"}
                  </div>
                </div>
              </div>
              <div className="userInfoGrid">
                <div className="infoRow">
                  <div className="infoItem">
                    <span className="label">Username</span>
                    <span className="value">{selectedUser.username}</span>
                  </div>
                  <div className="infoItem">
                    <span className="label">Email</span>
                    <span className="value">{selectedUser.email || 'N/A'}</span>
                  </div>
                </div>
                <div className="infoRow">
                  <div className="infoItem">
                    <span className="label">Phone</span>
                    <span className="value">{selectedUser.phone || 'N/A'}</span>
                  </div>
                  <div className="infoItem">
                    <span className="label">Country</span>
                    <span className="value">{selectedUser.country || 'N/A'}</span>
                  </div>
                </div>
                <div className="infoRow">
                  <div className="infoItem">
                    <span className="label">Joined Date</span>
                    <span className="value">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* <div className="infoItem">
                    <span className="label">Status</span>
                    <span className="value">{selectedUser.isActive ? 'Active' : 'Inactive'}</span>
                  </div> */}
                </div>
                <div className="infoRow full-width">
                  <div className="infoItem">
                    <span className="label">Description</span>
                    <span className="value">{selectedUser.desc || 'No description available'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? "active" : ""}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetSm;
