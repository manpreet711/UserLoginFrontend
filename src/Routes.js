import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import RemoveUser from "./User/RemoveUser";
import Signin from "./User/Signin";
import Signup from "./User/Signup";
import UpdateUser from "./User/UpdateUser";
import UserDashboard from "./User/UserDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/user/dashboard" exact component={UserDashboard} />
        <Route path="/user/update" exact component={UpdateUser} />
        <Route path="/user/delete" exact component={RemoveUser} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
