import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [loggedInUser] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (loggedInUser.email ? children : children)}
    />
  );
}

export default PrivateRoute;
