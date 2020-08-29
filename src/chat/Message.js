import React from "react";

const Message = ({ index, message, time, otherUserMsg, userName }) => {
  let classes = "text-left";
  if (otherUserMsg) {
    classes = "text-right";
  }

  let messageBody = (
    <div className={otherUserMsg ? "msg-bubble-right" : "msg-bubble-left"}>
      <div
        className="small text-black"
        style={{ color: "antiquewhite", fontWeight: "700" }}
      >
        {userName}
      </div>
      <div className={"text-small mb-0 text-white text-wrap " + classes}>
        {message}
      </div>
    </div>
  );

  if (otherUserMsg) {
    return (
      <div className="media  mb-1  message" key={index}>
        <div className="media-body ml-2">
          {messageBody}
          <p className="small text-muted text-left">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="media ml-auto mb-1 message" key={index}>
      <div className="media-body mr-2 ">
        {messageBody}
        <p className="small text-muted text-right">{time}</p>
      </div>
    </div>
  );
};

export default Message;
