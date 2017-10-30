//@flow
export const OPEN_ARTEMIS = "OPEN_ARTEMIS"
export const CLOSE_ARTEMIS = "CLOSE_ARTEMIS"
export const SEEK = "SEEK"
export const HUNT = "HUNT"
export const NONE = "NONE"

export const openArtemis = (type: string) => ({
  type: OPEN_ARTEMIS,
  payload: {
    type
  }
})

export const closeArtemis = (type: string) => ({
  type: CLOSE_ARTEMIS,
  payload: {
    type
  }
})
