import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:8888/";

  useEffect(() => {
    const parse = queryString.parse(location.search);
    const name = parse.name || "tronn007";
    const room = parse.room || "All";
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { userId: name, roomId: room, message }, () =>
        setMessage("")
      );
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <ul>
          {messages.map((item) => (
            <li>{item.text}</li>
          ))}
        </ul>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}> Send</button>
      </div>
    </div>
  );
};

export default Chat;
