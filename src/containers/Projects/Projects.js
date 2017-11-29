// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography } from "material-ui"
import { graphql, compose } from "react-apollo"
import { connect } from "react-redux"
import _ from "lodash"
import { toggleCreate } from "./../../store/actions/projects"
import { GET_PROJECTS } from "./../../apollo/queries"
import { Project, FloatingButton } from "./../../components"
import AddProject from "./AddProject"

const withProjects = graphql(GET_PROJECTS)

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleCreate(open))
})

const enhance = compose(connect(null, mapDispatchToProps), withProjects)

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
                    summary={project.summary}
                    status={project.status}
                    archived={project.archived}
                    color={_.get(project, "category.color", "#ccc")}
                  />
                </ProjectContainer>
              ))}
        </Content>
        <FloatingButton
          onClick={() => this.props.toggleDialog(true)}
          type="add"
          color="primary"
        />
        <AddProject />
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
export default enhance(Projects)
