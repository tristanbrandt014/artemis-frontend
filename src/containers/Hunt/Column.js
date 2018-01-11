// @flow
import React from "react"
import styled from "styled-components"
import { Typography } from "material-ui"

type Props = {
  name: string,
  show: boolean
}

const Column = (props: Props) => (
  <Container>
    {
      props.show &&
      <Inner>
        <Head>
          <Typography type="display1">{props.name}</Typography>
        </Head>
        <Body>{props.children}</Body>
      </Inner>
    }

  </Container>
)

const Container = styled.div`
  flex: 0 1 50%;
  height: 100%;
  padding: 10px 20px;
`

const Body = styled.div`
  margin-top: 16px;
  flex: 1 1 100%;
  overflow-y: auto;
`

const Head = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
`

const Inner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  max-height: 100%;
  display: flex;
  flex-flow: column nowrap;
`

export default Column
