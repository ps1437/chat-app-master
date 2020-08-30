import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Picker from "emoji-picker-react";

import { getCurrentTime, capitalize } from "./utils";
import Message from "./Message";

const Chat = ({ location }) => {
  const [userID, setUserID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [emojiClicked, showPanel] = useState(false);
  const socketRef = useRef();

  const sendEmoji = (event, emojiObject) => {
    setMessage((res) => res + emojiObject.emoji);
  };

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit("join", location.state.userName);
    setUserID(location.state.userName);
  }, [location]);

  useEffect(() => {
    socketRef.current.on("received message", (message) => {
      setMessages((oldMsgs) => [...oldMsgs, message]);
    });
    socketRef.current.on("user-connected", (users) => {
      setUsers(users);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: userID,
    };
    showPanel(false);
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  if (users.length === 0) {
    return (
      <div className="justify-center container-bgcolor jumbotron  join-chat">
        Please join the Chat Room
      </div>
    );
  }
  return (
    <div className="container justify-center container-bgcolor">
      <div className="row mt-2">
        <div
          className="col-md-4 background-white"
          style={{ paddingRight: 0, paddingLeft: 0 }}
        >
          <div className="activeUsers text-center font-weight-bold">
            Active Users
          </div>
          {users.map((user) => (
            <div className="users">🔵 {capitalize(user)} Joined the chat </div>
          ))}
        </div>
        <div className="col-md-8" style={{ padding: 0 }}>
        
          <h5 class="card-title text-right activeUsers">{userID}</h5>
          <div className="col-12 px-2 ">
            <div
              className="px-2 py-3 chat-box bg-white"
              style={{ height: 400 }}
            >
              {messages.map((msg, index) => {
                return (
                  <Message
                    otherUserMsg={msg.id !== userID}
                    userName={userID}
                    message={msg.body}
                    index={index}
                    time={getCurrentTime("-")}
                  />
                );
              })}
            </div>
            {emojiClicked ? <Picker onEmojiClick={sendEmoji} /> : ""}

            <form onSubmit={sendMessage} class="bg-light p-2">
              <div class="input-group">
                <input
                  type="text"
                  className="form-control rounded-0 border-0 py-4 bg-light"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="off"
                  autoFocus="on"
                  placeholder="type your message here..."
                />
                <div class="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>

                  <button
                    onClick={() => setMessage("")}
                    id="clear"
                    type="button"
                    className="btn btn-default"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => showPanel(!emojiClicked)}
                    id="clear"
                    type="button"
                    className="btn "
                  >
                    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                      &#128540;
                    </span>
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
