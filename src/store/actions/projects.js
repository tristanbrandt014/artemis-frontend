//@flow
export const TOGGLE_PROJECT_DIALOG = "TOGGLE_MODAL"

export const toggleProjectDialog = (open: Boolean) => ({
  type: TOGGLE_PROJECT_DIALOG,
  open
})