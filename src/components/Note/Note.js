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
    body: string,
    id: string
  }
}

type State = {
  edit: boolean,
  delete: boolean,
  loaded: boolean,
  tries: number
}

class Note extends Component<Props, State> {
  state = {
    edit: false,
    delete: false,
    loaded: false,
    tries: 0
  }
  componentDidMount() {
    if (!this.state.loaded && this.state.tries < 30) {
      if (window.location.hash) {
        const scroll_id = window.location.hash.substring(1)
        const element = document.getElementById(scroll_id)
        if (element) {
          element.style.backgroundColor = "#dfd"
          const main = document.getElementById("main-container")
          const offset = element.getBoundingClientRect().top
          setTimeout(() => {
            if (main) {
              main.scrollTo(0, offset - 65)
            }
            setTimeout(() => element.style.backgroundColor = "", 1000)
          }, 200)
          this.setState({
            loaded: true
          })
        }
        this.setState({
          tries: this.state.tries + 1
        })
      }
    }
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
        <Container id={this.props.note.id}>
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

export const Container = styled(Paper) `
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
