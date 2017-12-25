// @flow
import { combineReducers } from "redux"
import auth from "./auth"
import apollo from "./apollo"
import routing from "./routing"
import artemis from "./artemis"
import projects from "./projects"
import notes from "./notes"
import filters from "./filters"

import { LOGOUT } from "./../actions/auth"

const rootReducer = combineReducers({
  auth,
  apollo,
  routing,
  artemis,
  projects,
  notes,
  filters
})

export default (state: Object, action: Object): Object => {
  if (action.type === LOGOUT) {
    return {
      apollo: state.apollo
    }
  }
  return rootReducer(state, action)
}
