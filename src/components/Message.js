import React from "react";

const Message = ({ message }) => {
  const messageTime = message?.createdAt?.toDate
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        day: "numeric",
        month: "short",
      }).format(message.createdAt.toDate())
    : "";

  return (
    <div className="chat-bubble">
      <div className="chat-bubble__right">
        <p className="user-name">{message.name || "Anonymous"}</p>
        <p className="user-message">{message.text}</p>
        {messageTime && (
          <time className="message-time">
            {messageTime}
          </time>
        )}
      </div>
    </div>
  );
};

export default Message;
