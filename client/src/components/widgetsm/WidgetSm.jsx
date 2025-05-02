import React, { useState } from "react";
import "./WidgetSm.scss";
import { Visibility } from "@mui/icons-material";
import { usersData } from "../../data"; 

const WidgetSm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(usersData.length / usersPerPage);

  return (
    <div className="widgetSm">
      <h3 className="widgetSmTitle">New Joined Members</h3>
      <ul className="widgetSmList">
        {currentUsers.map((user, i) => (
          <li className="widgetSmListItem" key={i}>
            <img src={user.img} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              <span className="widgetSmUserTitle">{user.role}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              View
            </button>
          </li>
        ))}
      </ul>

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
    </div>
  );
};

export default WidgetSm;
