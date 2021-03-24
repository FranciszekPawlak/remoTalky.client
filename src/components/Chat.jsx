import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4001";

export const Chat = () => {
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat([...chat, data]);

      return socket.disconnect();
    });
  }, [chat]);

  const addMessage = (e) => {
    e.preventDefault();
    setMessage("");
    socket.emit("message", { user, message });
  };

  return (
    <Layout>
      <h1>Chat</h1>
      <ul>
        {chat.length === 0
          ? "empty"
          : chat.map((x) => (
              <li style={{ backgroundColor: x.user == 1 ? "red" : "green" }}>
                {x.message}
              </li>
            ))}
      </ul>
      <form onSubmit={addMessage}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>
        <button type="submit">Add</button>
      </form>
      <h1>User: {user}</h1>
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        value={user}
      ></input>
    </Layout>
  );
};
