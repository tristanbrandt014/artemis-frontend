// @flow
import React, { Component } from "react"
import Dialog from "material-ui/Dialog"
import { EditCategory as Form } from "../../components"
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
        onClose={this.props.close}
        fullScreen={this.props.window.width <= breakpoints.mobile}
      >
        <Container>
          <Form close={this.props.close} id={this.props.id} />
        </Container>
      </Dialog>
    )
  }
}

const Container = styled.div`
  min-width: 300px;
  height: 100%;
`

export default enhance(EditCategory)
