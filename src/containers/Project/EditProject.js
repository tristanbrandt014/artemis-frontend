// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { EditProject as Form } from "../../components"
import styled from "styled-components"
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
        onRequestClose={this.handleRequestClose}
        transition={Transition}
        fullScreen
      >
        <Container>
          <Form id={this.props.id} />
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
  padding: 15px;
`

export default enhance(AddProject)
