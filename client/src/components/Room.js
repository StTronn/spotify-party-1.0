import React, { useState, useEffect, useContext } from "react";
import Chat from "./ChatProto";
import Content from "./Content";
import queryString from "query-string";
import SongDisplay from "./SongDisplay";
import io from "socket.io-client";
import { Store } from "../Store";

let socket;

const Room = ({ location }) => {
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
          console.log("sendPlaybackState")
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
  return (
    <div className="outerContainer">
      <div className="max-w-full w-full h-screen overflow-hidden">
        <div className="flex flex-wrap h-full w-full aside-container">
          <main className="flex flex-col h-full w-3/4 xl:w-6/8 bg-sp-gray-light text-white">
            <Content playbackObj={playbackObj ? playbackObj : {}}></Content>
          </main>
          <aside className="h-full w-1/4 xl:w-2/8 bg-black text-white overflow-y-auto">
            <Chat
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Room;
