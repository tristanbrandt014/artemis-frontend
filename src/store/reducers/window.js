// @flow
import { SET_WINDOW_SIZE } from "../actions/window"

const initialState = {
  width: window.innerWidth
}

export default (state = initialState, action) => {
  if (action.type === SET_WINDOW_SIZE) {
    return {
      ...state,
      width: action.width
    }
  }
  return state
}