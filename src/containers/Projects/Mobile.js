// @flow
import React, { Component } from "react"
import { Paper, Typography } from "material-ui"
import List from "material-ui/List"
import styled from "styled-components"
import { ProjectListItem } from "./../../components"
import { CircularProgress } from "material-ui/Progress"

type Props = {
  projects: Array<Object>,
  title: string,
  loading: boolean
}

class Mobile extends Component<Props, {}> {
  render() {
    const { props } = this
    return (
      <Paper>
        <List
          subheader={
            <Typography
              style={{ paddingLeft: 19, paddingTop: 16, paddingBottom:10 }}
              type="title"
            >
              {props.title}
            </Typography>
          }
        >
          {!props.loading ? (
            props.projects.length ? (
              props.projects.map(project => (
                <ProjectListItem project={project} key={project.id} />
              ))
            ) : (
              <NoProjects>
                <Typography>
                  <em>No Projects</em>
                </Typography>
              </NoProjects>
            )
          ) : (
            <Center>
              <CircularProgress />
            </Center>
          )}
        </List>
      </Paper>
    )
  }
}

const NoProjects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Center = styled.div`
  display: flex;
  padding: 15px;
  justify-content: center;
`

export default Mobile
