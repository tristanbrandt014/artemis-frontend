// @flow
import React, { Component } from "react"
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List"
import defaults from "./../../utils/defaults"
import {get} from "lodash"
import MoreVert from "material-ui-icons/MoreVert"
import IconButton from "material-ui/IconButton"
import Menu, { MenuItem } from "material-ui/Menu"
import styled from "styled-components"
import ProjectActions from "./../ProjectActions/ProjectActions"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import Aux from "react-aux"
import { ALL } from "./../../utils/filters"

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(push(path))
})

const mapStateToProps = state => ({
  filters: state.filters
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

type Props = {
  project: {
    id: string,
    name: string,
    summary: string,
    archived: boolean,
    category?: {
      color: string
    }
  }
}

type State = {
  actions: boolean,
  anchorEl: any
}

class ProjectListItem extends Component<Props, State> {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { project } = this.props
    const { anchorEl } = this.state
    return (
      <ProjectActions
        id={project.id}
        archived={project.archived}
        render={toggleDialog => (
          <Aux>
            <ListItem
              button
              onClick={() =>
                this.props.redirect(`/app/projects/view/${project.id}`)
              }
            >
              <ListItemIcon>
                <Color
                  color={
                    get(project, "category.color") || defaults.categoryColor
                  }
                />
              </ListItemIcon>
              <ListItemText
                inset
                secondary={project.summary}
                primary={project.name}
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-owns={anchorEl ? `actions-${project.id}` : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Menu
              id={`actions-${project.id}`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={() => {
                  toggleDialog("delete", true)
                  this.handleClose()
                }}
              >
                Delete
              </MenuItem>
              {get(project.props, "filters.archived") !== ALL && (
                <MenuItem
                  onClick={() => {
                    toggleDialog("archive", true)
                    this.handleClose()
                  }}
                >
                  {project.archived ? `Restore` : `Archive`}
                </MenuItem>
              )}
            </Menu>
          </Aux>
        )}
      />
    )
  }
}

const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${props => props.color};
`

export default enhance(ProjectListItem)
