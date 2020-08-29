import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Chat from "./chat/Chat";
function App() {
  const [user, setUser] = useState({ userName: "" });
  const socketRef = useRef();
  function login(e) {
    e.preventDefault(); socketRef.current = io.connect("/");
    socketRef.current.emit("login",user)
  }
  return (
    <>
      <div className="container">
        <form onSubmit={login} class="bg-light p-2">
          <div class="input-group">
            <input
              type="text"
              aria-describedby="button-addon2"
              class="form-control rounded-0 border-0 py-4 bg-light"
              id="txt"
              value={user.userName}
              onChange={(e) => setUser({ userName: e.target.value })}
              autocomplete="off"
              autofocus="on"
              placeholder="Please Enter your name"
            />
            <div class="input-group-append">
              <button id="button-addon2" type="submit" class="btn btn-primary">
                Join
              </button>
            </div>
          </div>
        </form>

        <Chat />
      </div>
    </>
  );
}

export default App;
