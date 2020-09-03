import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Picker from "emoji-picker-react";
import { useToasts } from "react-toast-notifications";

import { getCurrentTime } from "./utils";
import ChatBox from "./ChatBox";
import Sidebar from "./Sidebar";

const Chat = ({ location }) => {
  const [userID, setUserID] = useState();
  const [toggle, setToggle] = useState();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [emojiClicked, showPanel] = useState(false);
  const socketRef = useRef();
  const { addToast } = useToasts();

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

    socketRef.current.on("new-user-connected", (userName) => {
      sendToast(`${userName} join the chat room `);
    });

    socketRef.current.on("image-share-received", (img) => {
      setMessages((oldMsgs) => [...oldMsgs, img]);
    });

    socketRef.current.on("user-disconnected", (userName, activeUsers) => {
      sendToast(`${userName} left the chat room `);
      setUsers(activeUsers);
    });
  }, []);

  function sendToast(msg) {
    addToast(msg, {
      appearance: "info",
      autoDismiss: true,
    });
  }
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
      socketRef.current.emit("image-share", msg);
    };
    reader.readAsDataURL(data);
  }

  return (
    <div
      id="wrapper"
      style={{ marginTop: "1rem" }}
      className={toggle ? " d-flex toggledright" : "container d-flex toggle"}
    >
      <Sidebar users={users} />
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-md navbar-blue">
          <button
            className="btn btn-default menuToggle"
            onClick={toggleSidebar}
          >
            <i className="text-white fa fa-bars" aria-hidden="true"></i>
          </button>

          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <i className="text-white fa fa-bars" aria-hidden="true"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav navbar-brand">
              <span class="nav-item text-white active title">Fun2Chat</span>
            </div>
            <div class="navbar-nav ml-auto">
              <div className="font-weight-bold text-white activeUsers">
                {userID}
              </div>
            </div>
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
                  <ChatBox
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
