// @flow
import React from "react"
import Aux from "react-aux"
import {Typography} from 'material-ui'
import styled from "styled-components"
import defaults from "./../../utils/defaults"
import { ProjectCard } from "./../../components"
import {get} from "lodash"

type Props = {
  projects: Array<Object>,
  title: string,
  loading: boolean
}

const Desktop = (props: Props) => (
  <Aux>
    <Typography type="display1">{props.title}</Typography>
    <Content>
      {!props.loading &&
        (props.projects.length ? (
          props.projects.map(project => (
            <ProjectContainer key={project.id}>
              {/* $FlowFixMe */}
              <ProjectCard
                id={project.id}
                name={project.name}
                summary={project.summary}
                status={project.status}
                archived={project.archived}
                color={
                  get(project, "category.color") || defaults.categoryColor
                }
              />
            </ProjectContainer>
          ))
        ) : (
          <NoProjects>
            <Typography>
              <em>No Projects</em>
            </Typography>
          </NoProjects>
        ))}
    </Content>
  </Aux>
)

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
`

const ProjectContainer = styled.div`
  flex: 1 1 380px;
  margin-right: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-flow: column nowrap;
`

const NoProjects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Desktop