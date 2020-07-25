import React, { useState, useEffect, useContext } from "react";
import { Store } from "../Store";
import SongDisplay from "./SongDisplay";

const Focus = () => {
  const { state } = useContext(Store);
  const { user, spotifyApi } = state;
  spotifyApi.setAccessToken(user.token);
  const [songInformation, setSongInformation] = useState();
  useEffect(() => {
    if (user) {
      window.setInterval(() => {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
          setSongInformation(response);
        });
      }, 1000);
    }
  }, [user, spotifyApi]);
  return (
    <>
      <SongDisplay songInformation={songInformation} />
    </>
  );
};

export default Focus;
