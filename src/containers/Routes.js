// @flow
import React from "react"
import { Route } from "react-router"
import Login from "./Auth/Login"
import Logout from "./Auth/Logout"
import Main from "./Main"

const Routes = () => (
  <div>
    <Route path="/" exact component={Main} />
    <Route path="/login" exact component={Login} />
    <Route path="/logout" exact component={Logout} />
  </div>
)

export default Routes
