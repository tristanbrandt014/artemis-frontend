// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography } from "material-ui"
import { graphql } from "react-apollo"
import { GET_PROJECTS } from "./../../apollo/queries"
import { Project, FloatingButton } from "./../../components"

const enhance = graphql(GET_PROJECTS)

class Projects extends Component<{}, {}> {
  render() {
    return (
      <Container>
        {/*$FlowFixMe*/}
        <Typography type="display1">Projects</Typography>
        <Content>
          {!this.props.data.loading &&
            this.props.data.Projects
              .filter(project => !project.archived)
              .map(project => (
                <ProjectContainer key={project.id}>
                  {/* $FlowFixMe */}
                  <Project
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    status={project.status}
                    color={project.category.color}
                  />
                </ProjectContainer>
              ))}
        </Content>
        <FloatingButton type="add" color="primary" />
      </Container>
    )
  }
}

const Container = styled.div`padding: 30px;`

const Content = styled.div`
  height: 50px;
  margin-top: 20px;
  display: flex;
`

const ProjectContainer = styled.div`flex: 0 0 370px;`

// $FlowFixMe
export default enhance(Projects)
