import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import { Message } from "../Message";
import SendIcon from "@material-ui/icons/Send";
import { Toast } from "../../Toast";
import { ConversationContext } from "../../../context/ConversationContext";
import "../../../style/conversation/desktop/messages.css";

const ENDPOINT = "http://localhost:4001";

export const Messages = () => {
  const { user } = useContext(AuthContext);
  const {
    conversationDesktop,
    desktopInitScroll,
    setDesktopInitScroll,
  } = useContext(ConversationContext);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState([]);
  const [seenMessages, setSeenMessages] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const socket = io(ENDPOINT);
    if (conversationDesktop) {
      setSocket(socket);

      socket.emit("joinConversation", user.id, conversationDesktop._id);

      socket.on("initMessages", (data) => {
        if (data.status === "success") {
          setMessages(data.data);
        } else {
          setError(data.data.name);
        }
      });

      socket.on("message", (data) => {
        if (data.status === "success") {
          setMessages((allMessages) => [...allMessages, data.data]);
        } else {
          setError(data.data);
        }
      });

      socket.on("typing", (data) => {
        if (data.status === "on") {
          const typingUser = conversationDesktop.users.find(
            (item) => item._id === data.user
          );
          setTyping([...typing, typingUser]);
        } else {
          const updateTypingUsers = typing.filter(
            (item) => item._id !== data.user
          );
          setTyping(updateTypingUsers);
        }
      });
    }
    return () => {
      socket.emit("leaveConversation");
    };
  }, [conversationDesktop]);

  useEffect(() => {
    if (desktopInitScroll) {
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  useEffect(() => setSeenMessages(false), [conversationDesktop]);

  const addMessage = () => {
    if (message !== "") {
      socket.emit("message", message, conversationDesktop._id, user.id);
      setMessage("");
    }
  };
  const handleTyping = (type) => socket.emit("typing", type);
  const markMessagesAsSeen = () => {
    if (!seenMessages) {
      socket.emit("markMessagesAsSeen");
      setSeenMessages(true);
    }
  };

  return (
    <>
      <div
        className="desktop-messages"
        onScroll={() => setDesktopInitScroll(false)}
      >
        {messages?.length > 0
          ? messages.map((element) => (
              <Message key={element._id} message={element} type="desktop" />
            ))
          : null}

        <div ref={divRef} />
      </div>
      {typing?.map((x) => (
        <span className="loading-dots">{x.username}</span>
      ))}
      <TextField
        className="desktop-messages-input"
        placeholder="type message.."
        variant="outlined"
        fullWidth
        size="small"
        multiline
        value={message}
        onBlur={() => handleTyping("off")}
        onFocus={() => {
          markMessagesAsSeen();
          handleTyping("on");
        }}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <SendIcon
              onClick={addMessage}
              style={{ cursor: "pointer" }}
              fontSize="small"
              color="primary"
            />
          ),
        }}
      ></TextField>
      {error && (
        <Toast
          type="error"
          message={error}
          closeAction={() => setError(null)}
        />
      )}
    </>
  );
};
