// @flow
import React from "react"
import { Route, Redirect } from "react-router"
import Login from "./Auth/Login"
import Logout from "./Auth/Logout"
import Register from "./Auth/Register"
import Main from "./Main/Main"
import Aux from "react-aux"

const Routes = () => (
  <Aux>
    <Route exact path="/" component={() => <Redirect to="/app" />} />
    <Route exact path="/app" component={() => <Redirect to="/app/projects" />} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/app" component={Main} />
  </Aux>
)

export default Routes
