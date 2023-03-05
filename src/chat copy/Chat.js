import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import ReactGiphySearchbox from "react-giphy-searchbox";

import Picker from "emoji-picker-react";
import { useToasts } from "react-toast-notifications";

import { getCurrentTime } from "./utils";
import ChatBox from "./ChatBox";
import Sidebar from "./Sidebar";

const Chat = ({ location }) => {
  const [userID, setUserID] = useState();
  const [roomName, setRoomName] = useState();
  const [toggle, setToggle] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [emojiClicked, showPanel] = useState(false);
  const [gifClicked, setGifPanel] = useState(false);
  const messagesEndRef = useRef(null)

  const socketRef = useRef();
  const { addToast } = useToasts();
  let history = useHistory();

  const sendEmoji = (event, emojiObject) => {
    setMessage((res) => res + emojiObject.emoji);
  };

  const showToast = useCallback(
    (msg) => {
      addToast(msg, {
        appearance: "info",
        autoDismiss: true,
      });
    },
    [addToast]
  );

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit(
      "join",
      location.state.roomName,
      location.state.userName
    );
    setUsers([location.state.userName]);
    setUserID(location.state.userName);
    setRoomName(location.state.roomName);
  }, [location.state.userName, location.state.roomName]);

  useEffect(() => {
    socketRef.current.on("received message", (message) => {
      setMessages((oldMsgs) => [...oldMsgs, message]);
    });

    socketRef.current.on("user-connected", (users) => {
      setUsers(users);
    });

    socketRef.current.on("new-user-connected", (userName) => {
      showToast(`${userName} join the chat room `);
    });

    socketRef.current.on("image-share-received", (img) => {
      setMessages((oldMsgs) => [...oldMsgs, img]);
    });

    socketRef.current.on("user-disconnected", (users, userName) => {
      showToast(`${userName} left the chat room `);
      setUsers(users);
    });


  }, [showToast]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: userID,
      type: "Text",
    };
    showPanel(false);
    setMessage("");
    setMessages((oldMsgs) => [...oldMsgs, messageObject]);

    socketRef.current.emit("send message", roomName, messageObject);
  }

  function sendFile(e) {
    var data = e.target.files[0];
    readThenSendFile(data);
  }
  function toggleSidebar() {
    setToggle(!toggle);
  }
  function leaveRoom() {
    socketRef.current.emit("disconnect");
    history.push("/");
  }

  function sendGif(item) {
    console.log(item);
    var msg = {};
    msg.id = userID;
    msg.body = item.images.preview_gif.url;
    msg.fileName = item.type;
    msg.type = "IMG";
    setMessages((oldMsgs) => [...oldMsgs, msg]);
    socketRef.current.emit("image-share", roomName, msg);
  }
  function readThenSendFile(data) {
    var reader = new FileReader();
    reader.onload = function (evt) {
      var msg = {};
      msg.id = userID;
      msg.body = evt.target.result.toString("base64");
      msg.fileName = data.name;
      msg.type = "IMG";
      setMessages((oldMsgs) => [...oldMsgs, msg]);

      socketRef.current.emit("image-share", roomName, msg);
    };
    reader.readAsDataURL(data);
  }

  return (
    <div
      id="wrapper"
      className={toggle ? " d-flex toggledright" : "container d-flex toggle"}
    >
      <Sidebar users={users} roomName={roomName} />
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-md navbar-blue">
          <button
            className="btn btn-default menuToggle"
            onClick={toggleSidebar}
          >
            <i className="text-white fa fa-bars" aria-hidden="true"></i>
          </button>

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <i className="text-white fa fa-bars" aria-hidden="true"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav navbar-brand">
              <span className="nav-item text-white active title">Fun2Chat</span>
            </div>
            <div className="navbar-nav ml-auto">
              <div className="font-weight-bold text-white activeUsers">
                {userID && userID.toUpperCase()}
              </div>
              <div
                title="leave room"
                className="font-weight-bold text-white activeUsers"
              >
                <i
                  className="fa fa-sign-out"
                  onClick={leaveRoom}
                  aria-hidden="true"
                ></i>
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
                  <div key={index}>
                    <ChatBox
                      otherUserMsg={msg.id !== userID}
                      userName={msg.id}
                      message={msg.body}
                      type={msg.type}
                      index={index}
                      time={getCurrentTime("-")}
                    />
                  </div>
                );
              })}
              <div ref={messagesEndRef} />

            </div>
            {emojiClicked ? <Picker onEmojiClick={sendEmoji} /> : ""}
            {gifClicked ? (
              <ReactGiphySearchbox
                gifPerPage={30}
                libray="stickers"
                gifListHeight="250px"
                masonryConfig={[
                  { mq: "320px", columns: 3, imageWidth: 90, gutter: 2 },
                  { mq: "768px", columns: 4, imageWidth: 100, gutter: 5 },
                  { mq: "1024px", columns: 7, imageWidth: 100, gutter: 5 },
                  { mq: "1824px", columns: 14, imageWidth: 100, gutter: 5 }
                ]}
                gifListHeight={200}
                listWrapperClassName="es_listWrapper__etyrU"
                wrapperClassName="es_componentWrapper__1Y0JA"
                poweredByGiphy={false}
                apiKey="CovmgqzY8DjIxJOhhjz4FAQds8SQIJKC" // Required: get your on https://developers.giphy.com
                onSelect={(item) => sendGif(item)}
              />
            ) : (
                ""
              )}
            <div>
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
                    onClick={() => { setGifPanel(false); showPanel(!emojiClicked) }}
                    id="clear"
                    type="button"
                    title="Emoji"
                    className="btn btn-emoji"
                  >
                    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                      &#128540;
                  </span>
                  </button>
                  <button
                    onClick={() => {
                      setGifPanel(!gifClicked)
                      showPanel(false);
                    }}
                    id="clear"
                    type="button"
                    title="Emoji"
                    className="btn btn-emoji"
                  >
                    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
                      GIF
                  </span>
                  </button>

                  <input
                    type="text"
                    id="desktop"
                    className="form-control rounded-0 border-1 py-4"
                    value={message}
                    onChange={(e) => {
                      if (emojiClicked) { showPanel(false); }
                      if (gifClicked) { setGifPanel(false); }

                      setMessage(e.target.value)
                    }
                    }
                    autoComplete="off"
                    autoFocus="on"
                    placeholder="type your message here..."
                  />
                  <div className="input-group-append" id="desktop">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>

                </div>
                <div className="m-send" id="mobile">
                  <input
                    type="text"
                    className="form-control rounded-0 border-1 py-4"
                    value={message}
                    onChange={(e) => {
                      if (emojiClicked) { showPanel(false); }
                      if (gifClicked) { setGifPanel(false); }

                      setMessage(e.target.value)
                    }
                    }
                    autoComplete="off"
                    autoFocus="on"
                    placeholder="type your message here..."
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-success">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div></div>

              </form></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
