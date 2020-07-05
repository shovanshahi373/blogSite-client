import React from "react";
import MainLayout from "../Layouts/default/MainLayout";
import AllBlogs from "../Components/AllBlogs";
import OneBlog from "../Components/OneBlog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Blog = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path='/blogs' exact component={AllBlogs} />
          <Route path='/blogs/:bid' exact component={OneBlog} />
          {/* <Route path='/blogs/author/:aid' exact component={BlogsByAuthor} /> */}
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default Blog;
