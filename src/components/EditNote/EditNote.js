// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import Form from "./Form"
import styled from "styled-components"
import Slide from "material-ui/transitions/Slide"

type Props = {
  open: boolean,
  onRequestClose: Function,
  id?: number,
  project_id: number
}
class EditNote extends Component<Props, {}> {
  render() {
    return (
      // $FlowFixMe
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        transition={Transition}
        fullScreen
      >
        <Container>
          <Form onRequestClose={this.props.onRequestClose} project_id={this.props.project_id} id={this.props.id} />
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

export default EditNote
