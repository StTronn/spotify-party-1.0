import React, { useState, useEffect, useContext } from "react";
import Chat from "./ChatProto";
import Content from "./Content";
import queryString from "query-string";
import io from "socket.io-client";
import { Store } from "../Store";

let socket;

const Room = ({ location }) => {
  const { state } = useContext(Store);
  const { user, spotifyApi } = state;
  const [roomId, setRoomId] = useState("");
  const [users, setUsers] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [playbackObj, setPlaybackObj] = useState({});
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:8888/";

  useEffect(() => {
    const parse = queryString.parse(location.search);
    const username = user.username || "tronn007";
    setCreatorName(parse.creatorName || "");
    console.log(parse.creatorName, "user", user.username);
    const roomId = parse.roomId || "All";
    socket = io(ENDPOINT);

    setRoomId(roomId);
    setUserName(username);

    socket.emit("join", { user, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });

    spotifyApi.setAccessToken(user.token);
    window.setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState().then((response) => {
        const newPlaybackObj = { [user.id]: response };
        socket.emit(
          "sendPlaybackState",
          { newPlaybackObj, roomId: roomId },
          () => console.log("")
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
      socket.emit("sendMessage", { username, roomId, message }, () =>
        setMessage("")
      );
    }
  };
  return (
    <div className="outerContainer">
      <div className="max-w-full w-full h-screen overflow-hidden">
        <div className="flex flex-wrap h-full w-full aside-container">
          <main className="flex flex-col h-full w-3/4 xl:w-6/8 bg-sp-gray-light text-white">
            <Content
              creatorName={creatorName}
              playbackObj={playbackObj ? playbackObj : {}}
            ></Content>
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
