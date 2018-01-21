// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import Form from "./Form"
import Slide from "material-ui/transitions/Slide"

type Props = {
  open: boolean,
  onClose: Function,
  id?: number,
  project_id?: number
}
class EditNote extends Component<Props, {}> {
  render() {
    return (
      // $FlowFixMe
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        transition={Transition}
        fullScreen
      >
        <Form
          onClose={this.props.onClose}
          project_id={this.props.project_id}
          id={this.props.id}
        />
      </Dialog>
    )
  }
}

const Transition = props => {
  return <Slide direction="up" {...props} />
}

export default EditNote
