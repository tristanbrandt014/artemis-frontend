//@flow
import React from "react"
import { connect } from "react-redux"
import { toggleNoteDialog } from "./../../store/actions/notes"
import { EditNote as Dialog } from "./../../components"

const mapStateToProps = state => ({
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  toggle: open => dispatch(toggleNoteDialog(open))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

type Props = {
  project_id?: number,
  id?: number
}

const EditNote = (props: Props) => (
  <Dialog
    open={props.notes.modal}
    onRequestClose={() => props.toggle(false)}
    id={props.id}
    project_id={props.project_id}
  />
)

export default enhance(EditNote)
