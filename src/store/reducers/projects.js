//@flow
import { TOGGLE_PROJECT_DIALOG } from "./../actions/projects"

const initialState = {
  modal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PROJECT_DIALOG:
      return {
        ...state,
        modal: action.open
      }
    default:
      return state
  }
}
