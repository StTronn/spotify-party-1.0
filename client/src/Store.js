import React, { useReducer } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const Store = React.createContext();

const spotifyApi = new SpotifyWebApi();
console.log(spotifyApi);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || false,
  spotifyApi,
  setToken: false,
};

function reducer(state, action) {
  console.log("reducer");
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      spotifyApi.setAccessToken(action.payload.token);
      return {
        ...state,
        setToken: true,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
