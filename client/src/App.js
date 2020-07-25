import React, { useState, useContext, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Focus from "./components/Focus";
import PrivateRoute from "./components/PrivateRoute";
import Chat from "./components/Chat";
import Room from "./components/Room";
import Login from "./components/Login";
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
  const [user, setUser] = useState(state.user);
  const params = getHashParams();
  const { access_token, username, id } = params;
  const token = access_token;
  useEffect(() => {
    if (token && username && !user) {
      dispatch({ type: "SET_USER", payload: { username, token, id } });
      dispatch({ type: "SET_TOKEN", payload: { token } });
    }
    if (token) spotifyApi.setAccessToken(token);
  }, []);
  if (token && user && !user) {
    setUser({ username, token });
  }
  if (!user) return <Login />;
  return (
    <>
      <Router>
        <Switch>
          <Route path="/focus" component={Focus} />
          <Route path="/login" component={Login} />
          <Route path="/room" component={Room} />
          <Route path="/chat" component={Chat} />
          <Route exact path="/" component={Chat} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
