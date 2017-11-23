//@flow
export const TOGGLE_PROJECT_CREATE_DIALOG = "TOGGLE_PROJECT_CREATE_DIALOG"
export const TOGGLE_PROJECT_UPDATE_DIALOG = "TOGGLE_PROJECT_UPDATE_DIALOG"

export const toggleCreate = (open: Boolean) => ({
  type: TOGGLE_PROJECT_CREATE_DIALOG,
  open
})

export const toggleUpdate = (open: Boolean) => ({
  type: TOGGLE_PROJECT_UPDATE_DIALOG,
  open
})