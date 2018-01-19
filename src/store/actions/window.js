export const SET_WINDOW_SIZE = "SET_WINDOW_SIZE"

export const setWindowSize = (width: number, height: number) => ({
  type: SET_WINDOW_SIZE,
  width,
  height,
})