import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { getCurrentDate } from "./utils";

const Chat = (props) => {
  const [userID, setUserID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("loginID", (id) => {
      setUserID(id);
    });

    socketRef.current.on("message", (message) => {
      setMessages((oldMsgs) => [...oldMsgs, message]);
    });
    socketRef.current.on("user", (user) => {
      setUsers((oldUsers) => [...oldUsers, user]);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: userID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  if (users.length == 0) {
    return <div>Please join the Chat Room</div>;
  }
  return (
    <div class="container justify-center">
      <div class="row mt-2">
        <div class="col-sm-10 col-md-10 offset-md-2 offset-sm-1 text-center mt-2">
          <div class="col-8 px-2 ">
            <ul type="none">
              {users.map((user) => (
                <li>{user.userName} Joined the chat </li>
              ))}
            </ul>
            <div class="px-2 py-3 chat-box bg-white" style={{ height: 400 }}>
              {messages.map((msg) => {
                if (msg.id !== userID) {
                  return (
                    <div class="media mb-1 message">
                      <figure class="figure">
                        <img
                          src="http://placehold.it/50/55C1E7/fff&text=A"
                          width="40"
                          class="rounded-circle"
                        />
                      </figure>

                      <div class="media-body ml-2">
                        <div class="bg-primary rounded py-2 px-3">
                          <span class="text-small mb-0 text-white text-wrap text-left">
                            {msg.body}
                          </span>
                        </div>
                        <p class="small text-muted">{getCurrentDate("-")}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div class="media  ml-auto mb-1 message">
                      <div class="media-body">
                        <div class="bg-secondary rounded py-2 px-3 mb-2">
                          <p class="text-small mb-0 text-white text-wrap  text-right">
                            {msg.body}
                          </p>
                        </div>
                        <span class="small text-muted">
                          {getCurrentDate("-")}
                        </span>
                      </div>
                      <span class="chat-img right clearfix  mx-2">
                        <img
                          src="http://placehold.it/50/FA6F57/fff&text=Me"
                          alt="ME"
                          width="40"
                          class="rounded-circle"
                        />
                      </span>
                    </div>
                  );
                }
              })}
            </div>

            <form onSubmit={sendMessage} class="bg-light p-2">
              <div class="input-group">
                <input
                  type="text"
                  aria-describedby="button-addon2"
                  class="form-control rounded-0 border-0 py-4 bg-light"
                  id="txt"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autocomplete="off"
                  autofocus="on"
                  placeholder="type your message here..."
                />
                <div class="input-group-append">
                  <button
                    id="button-addon2"
                    type="submit"
                    class="btn btn-primary"
                  >
                    Send
                  </button>

                  <button
                    onClick={() => setMessage("")}
                    id="clear"
                    type="button"
                    class="btn btn-default"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
