// @flow
import React from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { Header, Sidebar } from "./../../components"
import Artemis from "./../Artemis/Artemis"
import { Route, Switch } from "react-router"
import Projects from "./../Projects/Projects"
import Project from "./../Project/Project"

export default () => (
  <Container>
    <Header />
    <Body>
      <Sidebar />
      <Content>
        <Switch>
          <Route path="/app/projects/view/:id" exact component={Project} />
          <Route path="/app/projects" exact component={Projects} />
          <Route path="/app/projects/all" exact component={Projects} />
          <Route path="/app/projects/:type/:value" exact component={Projects} />
        </Switch>
      </Content>
    </Body>
    <Artemis />
  </Container>
)

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-flow: column nowrap;
`

const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  background-color: ${blueGrey[50]};
`

const Content = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`
