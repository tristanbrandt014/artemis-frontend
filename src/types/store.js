// @flow

export type Auth = {
  user?: {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    startup: string
  },
  token?: string
}

export type Store = {
  +auth: Auth
}
