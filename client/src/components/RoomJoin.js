import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../Store";
import styled from "styled-components";
import RoomLinkModal from "./RoomLinkModal";
import queryString from "query-string";
import io from "socket.io-client";
import { FaPlusCircle, FaUserPlus } from "react-icons/fa";

const CardCointainer = styled.div`
  display: grid;
  justify-items: center;
`;

let socket;

const RoomJoin = () => {
  const history = useHistory();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [roomId, setroomId] = React.useState("");
  const { state } = useContext(Store);
  const { user } = state;
  console.log(user);
  useEffect(() => {
    socket = io(process.env.REACT_APP_ENDPOINT);
  }, []);

  const openModal = () => {
    setIsOpen(true);
    console.log(modalIsOpen);
  };
  const joinRoom = () => {
    console.log("joinRoom");
    socket.emit("join", { user, roomId }, () => console.log(user));
  };

  const createRoom = () => {
    socket.emit("createRoom", user, () => console.log(user));
  };

  useEffect(() => {
    socket.on("joinLink", ({ roomId, creatorName }) => {
      console.log(creatorName);
      history.push(`/room?roomId=${roomId}&creatorName=${creatorName}`);
    });
  });

  return (
    <div className="bg-sp-gray-dark overflow-x-hidden">
      <div
        className=" bg-sp-green	bg-left-top bg-auto bg-repeat-x"
        style={{ height: "50vh", width: "100vw" }}
      ></div>
      <div className="md:-mt-64 -mt-48 ">
        <div className="w-full text-center">
          <h2 className="font-bold md:text-6xl text-3xl text-white">
            Get The Party Started !
          </h2>
        </div>
        <div className=" xl:mx-40 lg:mx-32  grid md:grid-cols-2 md:gap-2 px-auto sm:grid-cols-1">
          <div className="p-8 sm:p-8 text-center cursor-pointer text-white">
            <div
              onClick={openModal}
              className=" py-20 md:py-40 min-w-32 max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-sp-gray-light hover:bg-sp-gray-highlight transition duration-500"
              style={{ borderRadius: "10px", width: "" }}
            >
              <div className=" md:space-y-10">
                <i
                  className="fa fa-head-side-mask"
                  style={{ fontSize: "48px" }}
                />
                <div className="px-6 md:py-2">
                  <div className=" md:space-y-3">
                    <div className="font-bold text-3xl text-sp-green mb-2">
                      Join Room
                    </div>
                    <div className="grid justify-center text-sp-green">
                      <FaUserPlus size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-8 text-center cursor-pointer translate-x-2">
            <div
              onClick={createRoom}
              className="py-20 md:py-40 min-w-32 max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-sp-gray-light hover:bg-sp-gray-highlight transition duration-500 "
              style={{ borderRadius: "10px" }}
            >
              <div className="md:space-y-10">
                <i className="fa fa-swimmer" style={{ fontSize: "48px" }} />
                <div className="px-6 md:py-2">
                  <div className="space-y-3">
                    <div className="font-bold text-3xl mb-2 ">Create Room</div>
                    <div className="grid justify-center">
                      <FaPlusCircle size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RoomLinkModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        roomId={roomId}
        setroomId={setroomId}
        joinRoom={joinRoom}
      />
    </div>
  );
};

export default RoomJoin;
