import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import SpotifyWebApi from "spotify-web-api-js";
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
  const [user, setUser] = useState(state.user);
  const params = getHashParams();
  const { access_token, username, id } = params;
  const token = access_token;
  const history = useHistory();
  useEffect(() => {
    if (token && username && !user && moment(user.expires_in) < moment()) {
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
      history.push(`/`);
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
          <Route path="/roomjoin" component={RoomJoin} />
          <Route path="/room" component={Room} />
          <Route exact path="/" component={Room} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
