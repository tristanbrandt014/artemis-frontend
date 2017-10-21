// @flow
import { LOGIN } from "./../actions/auth"
import type { Auth } from "./../../types/store"

export default (state: Auth = {}, action: Object): Auth => {
  switch (action.type) {
    case LOGIN: {
      return {
        user: action.payload.user,
        token: action.payload.token
      }
    }
    default:
      return state
  }
}