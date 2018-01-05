// @flow
import React, { Component } from "react"
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import { IconButton } from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete'
import styled from "styled-components"
import Aux from "react-aux"
import EditCategory from './EditCategory'
import DeleteDialog from "./DeleteDialog"

type Props = {
  id: string,
  color: string,
  name: string
}

type State = {
  edit: boolean,
  delete: boolean
}

class CategoryItem extends Component<Props, State> {
  state = {
    edit: false,
    delete: false
  }
  toggleModal = (open: boolean, modal: "delete" | "edit") => {
    this.setState({
      [modal]: !!open
    })
  }
  render() {
    return (
      <Aux>
        <ListItem onClick={() => this.toggleModal(true, "edit")} key={this.props.id} button>
          {/* $FlowFixMe */}
          <ListItemAvatar>
            <Color color={this.props.color} />
          </ListItemAvatar>
          {/* $FlowFixMe */}
          <ListItemText
            primary={this.props.name}
          />
          {/* $FlowFixMe */}
          <ListItemSecondaryAction>
            {/* $FlowFixMe */}
            <IconButton onClick={() => this.toggleModal(true, "delete")} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <EditCategory close={() => this.toggleModal(false, "edit")} open={this.state.edit} id={this.props.id} />
        <DeleteDialog open={this.state.delete} toggle={open => this.toggleModal(open, "delete")} id={this.props.id} />
      </Aux>

    )
  }
}

const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${props => props.color};
`

export default CategoryItem