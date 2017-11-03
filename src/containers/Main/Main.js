// @flow
import React from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { Header, Sidebar } from "./../../components"
import Artemis from "./../Artemis/Artemis"
import {Route} from "react-router"
import Projects from "./../Projects/Projects"

export default () => (
  <Container>
    <Header />
    <Body>
      <Sidebar />
      <Content>
        <Route path="/app/projects" exact component={Projects} />        
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
`