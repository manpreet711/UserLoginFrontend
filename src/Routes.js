import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/home";
import RemoveUser from "./User/removeuser";
import Signin from "./User/signin";
import Signup from "./User/signup";
import UpdateUser from "./User/updateuser";
import UserDashboard from "./User/userdashboard";

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
