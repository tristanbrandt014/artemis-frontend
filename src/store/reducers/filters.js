// @flow
import { UPDATE_FILTER } from "./../actions/filters"
import { ALL, UNARCHIVED } from "./../../utils/filters"
import type { FiltersType } from "./../../types/filters"

const initialState = {
  archived: UNARCHIVED,
  status: ALL
}

export default (state: FiltersType = initialState, action) => {
  if (action.type === UPDATE_FILTER) {
    const { key, value } = action.payload
    return {
      ...state,
      [key]: value
    }
  }
  return state
}
