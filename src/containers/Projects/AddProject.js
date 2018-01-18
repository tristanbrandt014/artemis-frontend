// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { AddProject as Form } from "../../components"
import styled from "styled-components"
import { connect } from "react-redux"
import { toggleCreate } from "./../../store/actions/projects"
import { breakpoints } from "./../../styles"

const mapStateToProps = state => ({
  projects: state.projects,
  window: state.window
})

const mapDispatchToProps = dispatch => ({
  toggle: open => dispatch(toggleCreate(open))
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
        open={this.props.projects.modals.create}
        onClose={this.handleRequestClose}
        fullScreen={this.props.window.width <= breakpoints.mobile}
      >
        <Container>
          <Form />
        </Container>
      </Dialog>
    )
  }
}

const Container = styled.div`
  min-width: 300px;
  height: 100%;
`

export default enhance(AddProject)
