import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SongDisplay from "./components/SongDisplay";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

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
  const params = getHashParams();
  const token = params.access_token;
  if (token) spotifyApi.setAccessToken(token);
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [songInformation, setSongInformation] = useState();
  const [nowPlaying, setNowPlaying] = useState({
    name: "Not Checked",
    albumArt: "",
  });
  useEffect(() => {
    window.setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState().then((response) => {
        console.log(response);

        setSongInformation(response);
      });
    }, 1000);
  }, []);

  console.log(params);
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
          <SongDisplay songInformation={songInformation} />
        </div>
      </ThemeProvider>
    );
}

export default App;
