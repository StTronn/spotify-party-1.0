import React from "react";
import SongDisplay from "./SongDisplay";
import Chat from "./ChatProto";
import Content from "./Content";
import styled from "styled-components";

const Cointainer = styled.div`
  display: grid;
  color: white;
  height: auto;
`;

const TrackCointainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Proto = () => {
  const songInformation = JSON.parse(localStorage.getItem("songInformation"));
  console.log(songInformation);
  return (
    <>
      <div className="max-w-full w-full h-screen overflow-hidden">
        <div className="flex flex-wrap h-full w-full aside-container">
          <main className="flex flex-col h-full w-3/4 xl:w-6/8 bg-sp-gray-light text-white">
            <Content></Content>
          </main>
          <aside className="h-full w-1/4 xl:w-2/8 bg-black text-white overflow-y-auto">
            <Chat />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Proto;
