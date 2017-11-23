// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography } from "material-ui"
import { graphql } from "react-apollo"
import _ from "lodash"
import { GET_PROJECTS } from "./../../apollo/queries"
import { Project } from "./../../components"

const withProjects = graphql(GET_PROJECTS)

const enhance = withProjects

class Archives extends Component<{}, {}> {
  render() {
    console.log("ARCHIVES", this.props.data)
    return (
      <Container>
        {/*$FlowFixMe*/}
        <Typography type="display1">Archives</Typography>
        <Content>
          {!this.props.data.loading &&
            this.props.data.Projects
              .filter(project => project.archived)
              .map(project => (
                <ProjectContainer key={project.id}>
                  {/* $FlowFixMe */}
                  <Project
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    status={project.status}
                    archived={project.archived}
                    color={_.get(project, "category.color", "#ccc")}
                  />
                </ProjectContainer>
              ))}
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`padding: 30px;`

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
`

const ProjectContainer = styled.div`
  flex: 0 0 370px;
  margin-right: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-flow: column nowrap;
`

// $FlowFixMe
export default enhance(Archives)
