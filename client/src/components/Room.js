import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../Store";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Room = () => {
  const history = useHistory();
  const { state } = useContext(Store);
  const { user } = state;
  console.log(user);
  useEffect(() => {
    const ENDPOINT = "http://localhost:8888/";
    socket = io(ENDPOINT);
  }, []);

  const createRoom = () => {
    socket.emit("createRoom", user, () => console.log(user));
  };
  useEffect(() => {
    socket.on("joinLink", ({ link }) => {
      console.log(link);
      history.push(`/chat/?room=${link}`);
    });
  });
  return (
    <>
      <button onClick={createRoom}>Create Room</button>
      <button>Join Room</button>
    </>
  );
};

export default Room;
