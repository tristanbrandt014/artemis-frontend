// @flow
import { combineReducers } from "redux"
import auth from "./auth"
import apollo from "./apollo"
import routing from "./routing"
import artemis from "./artemis"

import { LOGOUT } from "./../actions/auth"

const rootReducer = combineReducers({
  auth,
  apollo,
  routing,
  artemis
})

export default (state: Object, action: Object): Object => {
  if (action.type === LOGOUT) {
    return {}
  }
  return rootReducer(state, action)
}
