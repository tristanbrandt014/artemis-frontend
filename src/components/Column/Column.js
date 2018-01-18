// @flow
import React from "react"
import styled from "styled-components"
import { Typography, Paper } from "material-ui"

type Props = {
  name: string
}

const Column = (props: Props) => (
  <Container>
    <Inner>
      <Head>
        <Typography type="headline">{props.name}</Typography>
      </Head>
      <Body>{props.children}</Body>
    </Inner>
  </Container>
)

const Container = styled(Paper)`
  flex: 0 1 470px;
  height: 100%;
  padding: 30px;
`

const Body = styled.div`
  margin-top: 16px;
`

const Head = styled.div`
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

export default Column
