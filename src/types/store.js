// @flow
import type { User } from "./user"

export type Auth = {
  user?: User,
  token?: string
}

export type Store = {
  +auth: Auth
}
