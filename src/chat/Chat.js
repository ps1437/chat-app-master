import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Picker from "emoji-picker-react";

import { getCurrentTime, capitalize } from "./utils";
import Message from "./Message";

const Chat = ({ location }) => {
  const [userID, setUserID] = useState();
  const [toggle, setToggle] = useState();

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
    socketRef.current.on("base64 file", (img) => {
      setMessages((oldMsgs) => [...oldMsgs, img]);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: userID,
      type: "Text",
    };
    showPanel(false);
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function sendFile(e) {
    var data = e.target.files[0];
    readThenSendFile(data);
  }
  function toggleSidebar() {
    setToggle(!toggle);
  }

  function readThenSendFile(data) {
    var reader = new FileReader();
    reader.onload = function (evt) {
      var msg = {};
      msg.id = userID;
      msg.file = evt.target.result;
      msg.fileName = data.name;
      msg.type = "IMG";
      socketRef.current.emit("base64 file", msg);
    };
    reader.readAsDataURL(data);
  }

  if (users.length === 0) {
    return (
      <div className="justify-center container-bgcolor jumbotron  join-chat">
        Please join the Chat Room
      </div>
    );
  }
  return (
    <div
      id="wrapper"
      style={{marginTop:"1rem"}}
      className={toggle ? " d-flex toggledright" : "container d-flex toggle"}
    >
      <div className="bg-light-chat " id="sidebar-wrapper">
        <div className="activeUsers text-center font-weight-bold">
          Active Users
        </div>
        <div className="list-group list-group-flush">
          {users.map((user,index) => (
            <div  key={index} className="users list-group-item list-group-item-action bg-light-chat">
             <div className="online">{user && user.charAt(0).toUpperCase()}
              </div>{capitalize(user)}
            </div>
          ))}
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-blue ">
          <button
            className="btn btn-default menuToggle"
            id="menu-toggle"
            onClick={toggleSidebar}
          >
            <i className="text-white fa fa-bars" aria-hidden="true"></i>
          </button>
          <div className="title">Fun2Chat</div>

          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="font-weight-bold text-white activeUsers" >
                 {userID}
                </div>
              </li>
              <li className="nav-item">
              <div className="font-weight-bold text-white activeUsers" >
              <i className="fa fa-video-camera" aria-hidden="true" title="video call"></i>
               </div></li>
            </ul>
          </div>
        </nav>

        <div className="container container-chat">
          <div className="col-12 px-2 ">
            <div
              className="px-2 py-3 chat-box bg-white"
              style={{ height: 400 }}
            >
              {messages.map((msg, index) => {
                return (
                  <Message
                    otherUserMsg={msg.id !== userID}
                    userName={msg.id}
                    message={msg.body}
                    type={msg.type}
                    index={index}
                    time={getCurrentTime("-")}
                  />
                );
              })}
            </div>
            {emojiClicked ? <Picker onEmojiClick={sendEmoji} /> : ""}

            <form onSubmit={sendMessage} className="bg-light-chat p-2">
              <div className="input-group">
                <label className="custom-file-upload">
                  <i
                    title="send pics"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>

                  <input
                    type="file"
                    className="form-control rounded-0 border-0 py-4 bg-light-chat"
                    onChange={(e) => sendFile(e)}
                    autoComplete="off"
                    accept="image/*"
                    autoFocus="on"
                    placeholder="type your message here..."
                  />
                </label>

                <button
                  onClick={() => showPanel(!emojiClicked)}
                  id="clear"
                  type="button"
                  title="Emoji"
                  className="btn btn-emoji"
                >
                  <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                    &#128540;
                  </span>
                </button>

                <input
                  type="text"
                  className="form-control rounded-0 border-1 py-4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="off"
                  autoFocus="on"
                  placeholder="type your message here..."
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
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
