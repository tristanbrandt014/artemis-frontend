// @flow
import type { Middleware } from "redux"
import type { Store } from "./../../types/store"
import {get} from "lodash"
import { includes } from "lodash"
import { push } from "react-router-redux"

const PUBLIC_ROUTES = ["/login", "/register"]

const authMiddleware: Middleware<
  Store,
  Object,
  Function
> = store => next => action => {
  const state = store.getState()
  if (action.type === "@@router/LOCATION_CHANGE") {
    if (
      !get(state, "auth.token", false) &&
      !includes(PUBLIC_ROUTES, action.payload.pathname)
    ) {
      store.dispatch(push("/login"))
    }
  }
  next(action)
}

export default authMiddleware
