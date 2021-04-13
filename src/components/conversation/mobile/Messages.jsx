import React, { useEffect, useContext, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import io from "socket.io-client";
import { AuthContext } from "../../../context/AuthContext";
import { Message } from "../Message";
import { TextField, Snackbar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ConversationContext } from "../../../context/ConversationContext";
import "../../../style/conversation/mobile/messages.css";
const ENDPOINT = "http://localhost:4001";

export const Messages = () => {
  const { conversationMobile, setConversationMobile } = useContext(
    ConversationContext
  );
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState([]);
  const [seenMessages, setSeenMessages] = useState(false);
  const [initScroll, setInitScroll] = useState(true);
  const divRef = useRef(null);
  useEffect(() => {
    const socket = io(ENDPOINT);
    if (conversationMobile) {
      setSocket(socket);

      socket.emit("joinConversation", user.id, conversationMobile._id);

      socket.on("initMessages", (data) => {
        if (data.status === "success") {
          setMessages(data.data);
        } else {
          setError(data.data);
        }
      });

      socket.on("message", (data) => {
        if (data.status === "success") {
          console.log(data);
          setMessages((allMessages) => [...allMessages, data.data]);
        } else {
          setError(data.data.name);
        }
      });

      socket.on("typing", (data) => {
        if (data.status === "on") {
          const typingUser = conversationMobile.users.find(
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
  }, [conversationMobile]);

  useEffect(() => {
    if (initScroll) {
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const addMessage = () => {
    if (message !== "") {
      socket.emit("message", message, conversationMobile._id, user.id);
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
    <Dialog fullScreen open={!!conversationMobile} className="mobile-messages">
      <div className="mobile-messages-bar">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => {
            setSeenMessages(false);
            setConversationMobile(null);
            setInitScroll(true);
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        {conversationMobile?.name && <span>{conversationMobile.name}</span>}
      </div>
      <div
        className="mobile-messages-content"
        onScroll={() => setInitScroll(false)}
      >
        {messages?.length > 0
          ? messages.map((element) => (
              <Message key={element._id} message={element} type="mobile" />
            ))
          : null}

        <div ref={divRef} />
      </div>
      {typing?.map((x) => (
        <span className="loading-dots">{x.username}</span>
      ))}

      <TextField
        className="mobile-messages-input"
        placeholder="type message.."
        variant="outlined"
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
    </Dialog>
  );
};
