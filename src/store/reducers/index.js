// @flow
import { combineReducers } from "redux"
import auth from "./auth"
import apollo from "./apollo"
import routing from "./routing"

import { LOGOUT } from "./../actions/auth"

const rootReducer = combineReducers({
  auth,
  apollo,
  routing
})

export default (state: Object, action: Object): Object => {
  if (action.type === LOGOUT) {
    return {}
  }
  return rootReducer(state, action)
}
