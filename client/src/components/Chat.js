import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import SongDisplay from "./SongDisplay";
import io from "socket.io-client";
import { Store } from "../Store";

let socket;

const Chat = ({ location }) => {
  const { state } = useContext(Store);
  const { user, spotifyApi } = state;
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [playbackObj, setPlaybackObj] = useState({});
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:8888/";

  useEffect(() => {
    const parse = queryString.parse(location.search);
    const name = user.username || "tronn007";
    const room = parse.room || "All";
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { user, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    spotifyApi.setAccessToken(user.token);
    window.setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState().then((response) => {
        const newPlaybackObj = { [user.id]: response };
        socket.emit("sendPlaybackState", { newPlaybackObj, roomId: room }, () =>
          console.log(response)
        );
      });
    }, 8000);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("playbackState", (obj) => {
      setPlaybackObj((playbackObj) => ({
        ...playbackObj,
        [Object.keys(obj)[0]]: Object.values(obj)[0],
      }));
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
  console.log(playbackObj);
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
      {Object.entries(playbackObj).map((item) => (
        <SongDisplay songInformation={item[1]} />
      ))}
    </div>
  );
};

export default Chat;
