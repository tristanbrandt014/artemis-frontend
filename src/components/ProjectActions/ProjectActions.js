// @flow
import React, { Component } from "react"
import Aux from "react-aux"
import ArchiveDialog from "./ArchiveDialog"
import DeleteDialog from "./DeleteDialog"

type Props = {
  id: string,
  archived: boolean,
  render: (toggle: Function) => any
}

type State = {
  archive: boolean,
  delete: boolean
}

class ProjectActions extends Component<Props, State> {
  state = {
    archive: false,
    delete: false
  }
  toggleDialog = (dialog: "delete" | "archive", open?: boolean) => {
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
        {this.props.render(this.toggleDialog)}
        {/* $FlowFixMe */}
        <ArchiveDialog
          id={this.props.id}
          toggle={open => this.toggleDialog("archive", open)}
          open={this.state.archive}
          archived={this.props.archived}
        />
        {/* $FlowFixMe */}
        <DeleteDialog
          id={this.props.id}
          toggle={open => this.toggleDialog("delete", open)}
          open={this.state.delete}
        />
      </Aux>
    )
  }
}

export default ProjectActions