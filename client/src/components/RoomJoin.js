import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../Store";
import styled from "styled-components";
import queryString from "query-string";
import io from "socket.io-client";

const CardCointainer = styled.div`
  display: grid;
  justify-items: center;
`;

let socket;

const RoomJoin = () => {
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
    <div className="bg-sp-gray-dark">
      <div
        className=" bg-sp-green	bg-left-top bg-auto bg-repeat-x"
        style={{ height: "50vh", width: "100vw" }}
      ></div>
      <div className="-mt-64 ">
        <div className="w-full text-center">
          <h2 className="font-bold text-6xl text-white">
            Get The Party Started !
          </h2>
        </div>
        <div className="mx-40 grid grid-cols-2 gap-2 px-auto sm:grid-cols-2">
          <div className="p-8 sm:p-8 text-center cursor-pointer text-white">
            <div
              className="py-40 max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-sp-gray-light hover:bg-sp-gray-highlight transition duration-500"
              style={{ borderRadius: "10px", width: "" }}
            >
              <div className="space-y-10">
                <i
                  className="fa fa-head-side-mask"
                  style={{ fontSize: "48px" }}
                />
                <div className="px-6 py-2">
                  <div className="space-y-3">
                    <div className="font-bold text-3xl text-sp-green mb-2">
                      Join Room
                    </div>
                    <p className="text-base">
                      Altos estandares de bioseguridad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-8 text-center cursor-pointer translate-x-2">
            <div
              className="py-40 max-w-sm mx-auto rounded overflow-hidden bg-sp-gray-light shadow-lg hover:bg-white transition duration-500 text-white  "
              style={{ borderRadius: "10px" }}
            >
              <div className="space-y-10">
                <i className="fa fa-swimmer" style={{ fontSize: "48px" }} />
                <div className="px-6 py-2">
                  <div className="space-y-3">
                    <div className="font-bold text-3xl mb-2 ">Create Room</div>
                    <p className=" text-base">Piscina temperada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomJoin;
