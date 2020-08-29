import React, { useState, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

import Chat from "./chat/Chat";
function App() {
  const [user, setUser] = useState({ userName: "", login: false });
  const socketRef = useRef();
  function login(e) {
    e.preventDefault();
    socketRef.current = io.connect("/");
    socketRef.current.emit("login", user);
    setUser({ userName: "", login: true });
  }
  return (
    <>
      <div className="container">
        <form onSubmit={login} className="bg-light p-2">
          <div className="input-group">
            <input
              type="text"
              aria-describedby="button-addon2"
              className="form-control rounded-0 border-0 py-4 bg-light"
              id="txt"
              value={user.userName}
              onChange={(e) => setUser({ userName: e.target.value })}
              autoComplete="off"
              autoFocus="on"
              placeholder="Please Enter your name"
            />
            <div className="input-group-append">
              <button
                id="button-addon2"
                type="submit"
                className="btn btn-primary"
              >
                Join
              </button>
            </div>
          </div>
        </form>

        {user.login ? <Chat name={user.userName} /> : ""}
      </div>
    </>
  );
}

export default App;
