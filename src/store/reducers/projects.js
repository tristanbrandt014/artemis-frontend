//@flow
import {
  TOGGLE_PROJECT_CREATE_DIALOG,
  TOGGLE_PROJECT_UPDATE_DIALOG
} from "./../actions/projects"

const initialState = {
  modals: {
    create: false,
    update: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PROJECT_CREATE_DIALOG:
      return {
        ...state,
        modals: {
          ...state.modals,
          create: action.open
        }
      }
    case TOGGLE_PROJECT_UPDATE_DIALOG:
      return {
        ...state,
        modals: {
          ...state.modals,
          update: action.open
        }
      }
    default:
      return state
  }
}
