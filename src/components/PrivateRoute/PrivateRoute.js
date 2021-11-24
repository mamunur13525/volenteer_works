import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const userData = JSON.parse(localStorage.getItem("userInfo")) || {};

  return (
    <Route
      {...rest}
      render={({ location }) =>
      userData.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
