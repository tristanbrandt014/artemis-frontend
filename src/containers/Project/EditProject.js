// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { EditProject as Form } from "../../components"
import { connect } from "react-redux"
import { toggleUpdate } from "./../../store/actions/projects"
import Slide from "material-ui/transitions/Slide"

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  toggle: open => dispatch(toggleUpdate(open))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

class AddProject extends Component<{}, {}> {
  handleRequestClose = () => {
    this.props.toggle(false)
  }

  render() {
    return (
      // $FlowFixMe
      <Dialog
        open={this.props.projects.modals.update}
        onClose={this.handleRequestClose}
        transition={Transition}
        fullScreen
      >
          <Form id={this.props.id} />
      </Dialog>
    )
  }
}

const Transition = props => {
  return <Slide direction="up" {...props} />
}

export default enhance(AddProject)
