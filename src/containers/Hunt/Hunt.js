// @flow
import React from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { Paper } from "material-ui"

const Hunt = () =>
  <Container>
    <Wrapper>
      Hello
    </Wrapper>
  </Container>

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${blueGrey[500]};
  display: flex;
  flex-flow: row nowrap;
  padding: 15px;
  justify-content: space-around;
`

const Wrapper = styled(Paper) `
  flex: 0 0 50%;
`

export default Hunt