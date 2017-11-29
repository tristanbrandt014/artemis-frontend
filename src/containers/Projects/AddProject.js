// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { AddProject as Form } from "../../components"
import styled from "styled-components"
import { connect } from "react-redux"
import { toggleCreate } from "./../../store/actions/projects"

const mapStateToProps = state => ({
  projects: state.projects
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
        onRequestClose={this.handleRequestClose}
      >
        <Container>
          <Form />
        </Container>
      </Dialog>
    )
  }
}

const Container = styled.div`width: 400px;`

export default enhance(AddProject)