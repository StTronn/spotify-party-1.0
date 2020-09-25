import React, { useState, useEffect, useContext } from "react";
import BottomNav from "./BottomNav";
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
  const [chatOpen, setChatOpen] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [playbackObj, setPlaybackObj] = useState({});
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const parse = queryString.parse(location.search);
    const username = user.username || "tronn007";
    setCreatorName(parse.creatorName || "");
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
        const newPlaybackObj = { [user.id]: [response, user.username] };
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
  const chatClass =
    !chatOpen && window.innerWidth < 768
      ? "hidden h-full md:col-start-4 md:col-end-4 bg-black text-white overflow-y-auto"
      : "h-full md:col-start-4 md:col-end-4 bg-black text-white overflow-y-auto";
  const contentClass =
    chatOpen && window.innerWidth < 768
      ? "hidden h-full md:col-start-1 md:col-end-4  bg-sp-gray-light text-white"
      : " h-full md:col-start-1 md:col-end-4  bg-sp-gray-light text-white";

  return (
    <div className="outerContainer">
      <div className="max-w-full w-full h-screen ">
        <div className="grid sm:grid-cols-1 md:grid-cols-4 h-full w-full aside-container">
          <main className={contentClass}>
            <Content
              creatorName={creatorName}
              playbackObj={playbackObj ? playbackObj : {}}
              roomId={roomId}
            ></Content>
          </main>
          <aside className={chatClass}>
            <Chat
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </aside>
        </div>
      </div>
      <BottomNav chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  );
};

export default Room;
