//@flow
export const TOGGLE_NOTE_DIALOG = "TOGGLE_NOTE_DIALOG"

export const toggleNoteDialog = (open: Boolean) => ({
  type: TOGGLE_NOTE_DIALOG,
  open
})