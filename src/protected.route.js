import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLoginContext } from "./Contexts/loginContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useLoginContext();
  console.log({ loggedIn }, "from protected route");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return <p>loading...</p>;
          // return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
