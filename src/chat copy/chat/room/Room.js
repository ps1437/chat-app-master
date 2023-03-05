import React from "react";

const Room = ({ title }) => {
  return (
    <div className="col col-md-3" style={{ marginTop: "1rem" }}>
      <div
        class="card card-animate "
        style={{ minWidth: "10rem", 
        border:0,
        boxShadow: "1px 4px 10px #5f86ff" }}
      >
        <div class="card-body text-center"
        style={{padding:"1rem"}}
        >
          <h5 class="card-title ">{title}</h5>
          <a href="#" class="card-link">
            Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default Room;
