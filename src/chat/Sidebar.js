import React from "react";
import { capitalize } from "./utils";

const Sidebar = ({ users, roomName }) => {
  return (
    <div className="bg-light-chat " id="sidebar-wrapper">
      <div className="activeUsers text-center font-weight-bold">
        Active Users
    </div>
      <div className="list-group list-group-flush">
        <div className="users list-group-item list-group-item-action bg-roomname">
           {`Room : ${roomName}`}</div>
        {users.map((user, index) => (
          <div
            key={index}
            className="users list-group-item list-group-item-action bg-light-chat"
          >
            <div className="online">
              {user && user.charAt(0).toUpperCase()}
            </div>
            {capitalize(user)}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Sidebar;
