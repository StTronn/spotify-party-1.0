import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Store } from "../Store";

const PrivateRoute = ({ component: Component, token, username, ...rest }) => {
  // Add your own authentication on the below line.
  const { state, dispatch } = useContext(Store);
  const isLoggedIn = state.user;
  console.log(state);
  useEffect(() => {
    if (token && username && !isLoggedIn) {
      dispatch({ type: "SET_USER", payload: { username, token } });
      dispatch({ type: "SET_TOKEN", payload: { token } });
    }
  }, [token, username, dispatch, isLoggedIn]);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
