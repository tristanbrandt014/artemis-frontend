// @flow
import {OPEN_ARTEMIS, CLOSE_ARTEMIS, SEEK, NONE} from "../actions/artemis"

export default (state: string = "", action: Object): string => {
  switch (action.type) {
    case OPEN_ARTEMIS: {
      if (action.payload.type === SEEK) {
        return SEEK
      }
      return state
    }
    case CLOSE_ARTEMIS: {
     return NONE
    }
    default: {
      return state
    }
  }
}