import React from "react";
import MainLayout from "../Layouts/default/MainLayout";
import AllBlogs from "./AllBlogs";
import OneBlog from "./OneBlog";
import Profile from "./User/Profile";
import ErrorPage from "./Error.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../protected.route";

const Index = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/blogs" exact component={AllBlogs} />
          <Route path="/blogs/:bid" exact component={OneBlog} />
          <ProtectedRoute path="/:user/profile" exact component={Profile} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default Index;
