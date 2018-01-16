import {TOGGLE_SIDEBAR} from "./../actions/sidebar"

export default (state = false, action: Object) => {
  if (action.type === TOGGLE_SIDEBAR) {
    return action.open
  }
  return state
}