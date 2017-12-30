// @flow
import { combineReducers } from "redux"
import { get, cloneDeep } from "lodash"
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
  const newState = cloneDeep(state)
  if (action.type === LOGOUT) {
    return {
      apollo: state.apollo
    }
  }
  const categoryPattern = /app\/projects\/category\/(.{24})/
  const pathname = get(state, "routing.location.pathname", "") || ""
  const match = pathname.match(categoryPattern)
  let category = get(match, "[1]")
  const isBase = pathname.match(/app\/projects$/) !== null
  if (!category && isBase) {
    category = ""
  }

  if (typeof category === "string" && typeof get(newState, "filters.category") === "string") {
    newState.filters.category = category
  }

  return rootReducer(newState, action)
}
