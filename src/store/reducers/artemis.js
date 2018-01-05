// @flow
import {OPEN_ARTEMIS, CLOSE_ARTEMIS, NONE} from "../actions/artemis"

export default (state: string = NONE, action: Object): string => {
  switch (action.type) {
    case OPEN_ARTEMIS: {
      return action.payload.type
    }
    case CLOSE_ARTEMIS: {
     return NONE
    }
    default: {
      return state
    }
  }
}