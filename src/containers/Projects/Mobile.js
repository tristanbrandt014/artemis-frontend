// @flow
import React from "react"
import { Paper, Typography } from "material-ui"
import ListSubheader from "material-ui/List/ListSubheader"
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List"
import defaults from "./../../utils/defaults"
import styled from "styled-components"
import { get } from "lodash"
import IconButton from 'material-ui/IconButton'
import MoreVert from 'material-ui-icons/MoreVert'

type Props = {
  projects: Array<Object>,
  title: string,
  loading: boolean
}

const Mobile = (props: Props) => (
  <Paper>
    <List subheader={<ListSubheader>{props.title}</ListSubheader>}>
      {!props.loading &&
        (props.projects.length ? (
          props.projects.map(project => (
            <ListItem key={project.id} button>
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
                <IconButton aria-label="Delete">
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <NoProjects>
            <Typography>
              <em>No Projects</em>
            </Typography>
          </NoProjects>
        ))}
    </List>
  </Paper>
)

const NoProjects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${props => props.color};
`

export default Mobile
