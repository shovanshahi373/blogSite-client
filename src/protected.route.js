import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auths/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = new Auth();
  // localStorage.console.log(auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.loginStatus()) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
