// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { EditNote as Form } from "../../components"
import styled from "styled-components"
import { connect } from "react-redux"
import { toggleNoteDialog } from "./../../store/actions/notes"
import Slide from "material-ui/transitions/Slide"

const mapStateToProps = state => ({
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  toggle: open => dispatch(toggleNoteDialog(open))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

class EditNote extends Component<{}, {}> {
  handleRequestClose = () => {
    this.props.toggle(false)
  }

  render() {
    return (
      // $FlowFixMe
      <Dialog
        open={this.props.notes.modal}
        onRequestClose={this.handleRequestClose}
        transition={Transition}
        fullScreen
      >
        <Container>
          <Form project_id={this.props.project_id} id={this.props.id} />
        </Container>
      </Dialog>
    )
  }
}

const Transition = props => {
  return <Slide direction="up" {...props} />
}

const Container = styled.div`
  width: 100%;
  margin-top: 60px;
  padding: 15px 0;
`

export default enhance(EditNote)
