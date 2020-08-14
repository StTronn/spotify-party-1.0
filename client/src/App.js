import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import SpotifyWebApi from "spotify-web-api-js";
import { createBrowserHistory } from "history";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Focus from "./components/Focus";
import PrivateRoute from "./components/PrivateRoute";
import Room from "./components/Room";
import RoomJoin from "./components/RoomJoin";
import Login from "./components/Login";
import { Store } from "./Store";
import "./App.css";

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
  const { access_token, username, id } = params;
  const token = access_token;
  useEffect(() => {
    console.log(user.expires_in > moment());
    if (user && moment(user.expires_in) < moment()) {
      localStorage.removeItem("user");
    }
    if (token && username && !user) {
      const time = moment().add(1, "hour");
      dispatch({
        type: "SET_USER",
        payload: {
          username,
          token,
          id,
          expires_in: time,
        },
      });
      dispatch({ type: "SET_TOKEN", payload: { token } });
    }
    if (token) spotifyApi.setAccessToken(token);
  }, []);
  if (!user) return <Login />;
  return (
    <>
      <Router>
        <Switch>
          <Route path="/focus" component={Focus} />
          <Route path="/login" component={Login} />
          <Route path="/roomjoin" component={RoomJoin} />
          <Route path="/room" component={Room} />
          <Route exact path="/" component={RoomJoin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
