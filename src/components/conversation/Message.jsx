import { Tooltip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React, { useEffect, useState, useContext } from "react";
import { ConversationContext } from "../../context/ConversationContext";
import { AuthContext } from "../../context/AuthContext";
import "../../style/conversation/message.css";
export const Message = ({ message, type }) => {
  const { user } = useContext(AuthContext);
  const { conversationMobile, conversationDesktop } = useContext(
    ConversationContext
  );
  const [conversationUsers, setConversationUsers] = useState([]);
  const seenUsers = conversationUsers.filter(
    (item) => message.seen.includes(item._id) && message.user._id !== item._id
  );
  const iconsMarkAsSeen = message.seen.filter((item) => item !== user.id);

  useEffect(() => {
    type === "mobile"
      ? setConversationUsers(conversationMobile.users)
      : setConversationUsers(conversationDesktop.users);
  }, [,]);

  return (
    <span
      className={`${
        message.user._id === user.id ? "message-right" : "message-left"
      } message-container`}
      key={message._id}
    >
      {iconsMarkAsSeen?.length > 0 && message.user._id === user.id ? (
        <span className="message-icons">
          {iconsMarkAsSeen.map((e) => (
            <DoneIcon key={e} />
          ))}
        </span>
      ) : null}
      <Tooltip
        enterTouchDelay={10}
        placement={message.user._id === user.id ? "left" : "right"}
        title={
          <span className="message-tooltip">
            <span>{new Date(message.createDate).toLocaleString()}</span>
            <span>From {message.user.username}</span>
            <span>Seen: {seenUsers.map((e) => e.username + " ")}</span>
          </span>
        }
      >
        <span
          className={`${
            message.user._id === user.id ? "message-dark" : "message-light"
          } message-text`}
        >
          <span>{message.text}</span>
        </span>
      </Tooltip>
      {iconsMarkAsSeen?.length > 0 && message.user._id !== user.id ? (
        <span className="message-icons">
          {iconsMarkAsSeen.map((e) => (
            <DoneIcon key={e} />
          ))}
        </span>
      ) : null}
    </span>
  );
};
