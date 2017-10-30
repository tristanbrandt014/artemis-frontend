// @flow
import React from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { Header, Sidebar } from "./../../components"
import Artemis from "./../Artemis/Artemis"

export default () => (
  <Container>
    <Header />
    <Body>
      <Sidebar />
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
