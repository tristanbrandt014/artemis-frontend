//@flow
import { TOGGLE_NOTE_DIALOG } from "./../actions/notes"

const initialState = {
  modals: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTE_DIALOG:
      return {
        ...state,
        modal: action.open
      }
    default:
      return state
  }
}
