import React, { useState } from "react";
import "./WidgetSm.scss";
import { Visibility } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";

const WidgetSm = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
              <span className="widgetSmUsername">{user?.username|| "Unknown"}</span>
              <span className="widgetSmUserTitle">
                {user.isSeller ? "Freelancer" : "Genaral User"}
              </span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              View
            </button>
          </li>
        ))}
      </ul>

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
