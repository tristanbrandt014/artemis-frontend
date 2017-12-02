// @flow
import React, { Component } from "react"
import styled from "styled-components"
import Aux from "react-aux"
import MarkdownRenderer from "./../Markdown/Renderer"
import EditNote from "../EditNote/EditNote"
import { Paper, Button } from "material-ui"
import DeleteDialog from "./DeleteDialog"

type Props = {
  note: {
    body: string
  }
}

type State = {
  edit: boolean,
  delete: boolean
}

class Note extends Component<Props, State> {
  state = {
    edit: false
  }
  toggleDialog(dialog: "edit" | "delete", open?: boolean) {
    if (typeof open !== "boolean") {
      this.setState({
        [dialog]: !this.state[dialog]
      })
    } else {
      this.setState({
        [dialog]: open
      })
    }
  }
  render() {
    return (
      <Aux>
        <Container>
          <Inner>
            <MarkdownRenderer markdown={this.props.note.body} />
          </Inner>
          <Actions>
            <Button
              onClick={() => this.toggleDialog("delete", true)}
              dense
              color="accent"
            >
              Delete
            </Button>
            {/* $FlowFixMe */}
            <Button
              onClick={() => this.toggleDialog("edit", true)}
              dense
              color="primary"
            >
              Edit
            </Button>
          </Actions>
        </Container>
        <EditNote
          open={this.state.edit}
          onRequestClose={() => this.toggleDialog("edit", false)}
          id={this.props.note.id}
        />
        <DeleteDialog
          open={this.state.delete}
          toggle={open => this.toggleDialog("delete", open)}
          id={this.props.note.id}
        />
      </Aux>
    )
  }
}

export const Container = styled(Paper)`
  margin-bottom: 20px;
`

export const Inner = styled.div`
  padding: 10px;
  padding-bottom: 0;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 5px;
  padding-right: 5px;
`

export default Note
