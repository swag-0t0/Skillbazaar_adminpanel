import React, { useState } from 'react';
import './Moderators.scss';
import { moderatorsData } from '../../data';
import { Delete } from '@mui/icons-material';

const Moderators = () => {
  const [moderators, setModerators] = useState(moderatorsData);

  const handleDelete = (id) => {
    setModerators(moderators.filter((mod) => mod.id !== id));
  };

  return (
    <div className="moderatorsPage">
      <div className="moderatorsSection">
        {/* Add Moderator Form */}
        <div className="addModeratorCard">
          <h2>Add Moderator</h2>
          <form className="moderatorForm">
            <div className="imageUpload">
              <label htmlFor="image">Upload Image</label>
              <input type="file" id="image" accept="image/*" />
            </div>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <select>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            <input type="password" placeholder="Set Password" />
            <button type="submit" className="addBtn">Add Moderator</button>
          </form>
        </div>

        {/* Moderators Table */}
        <div className="moderatorsTableContainer">
          <h2>Moderators</h2>
          <table className="moderatorsTable">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((mod, index) => (
                <tr key={mod.id} className={index % 2 === 1 ? 'altRow' : ''}>
                  <td>
                    <img src={mod.avatar} alt="" className="modAvatar" />
                  </td>
                  <td>{mod.fullName}</td>
                  <td>{mod.email}</td>
                  <td>{mod.role}</td>
                  <td>
                    <Delete className="deleteIcon" onClick={() => handleDelete(mod.id)} />
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