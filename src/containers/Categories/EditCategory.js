// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { EditCategory as Form } from "../../components"
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

type Props = {
  close: Function,
  open: boolean,
  id: string
}

class EditCategory extends Component<Props, {}> {
  render() {
    return (
      // $FlowFixMe
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <Container>
          <Form close={this.props.close} id={this.props.id} />
        </Container>
      </Dialog>
    )
  }
}

const Container = styled.div`width: 400px;`

export default enhance(EditCategory)
