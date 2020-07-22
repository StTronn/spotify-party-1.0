import React, { useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SongDisplay from "./components/SongDisplay";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Store } from "./Store";

const spotifyApi = new SpotifyWebApi();
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

function App() {
  const { state, dispatch } = useContext(Store);
  const { user } = state;
  const params = getHashParams();
  const { access_token, username } = params;
  const token = access_token;
  if (username && !user) {
    dispatch({ type: "SET_USER", payload: { username, token } });
    dispatch({ type: "SET_TOKEN", payload: { token } });
  }
  if (token) spotifyApi.setAccessToken(token);
  const loggedIn = token ? true : false;

  if (!loggedIn) {
    return (
      <ThemeProvider>
        <div className="App">
          <CSSReset />
          <a href="http://localhost:8888/login"> Login to Spotify </a>
        </div>
      </ThemeProvider>
    );
  }
  if (loggedIn)
    return (
      <ThemeProvider>
        <div style={{ display: "grid" }}>
          <CSSReset />
          <SongDisplay />
        </div>
      </ThemeProvider>
    );
}

export default App;
