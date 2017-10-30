// @flow
import React from "react"
import styled from "styled-components"

type Props = {
  children?: Object
}

const FullScreen = (props: Props) => <Container>{props.children && props.children}</Container>

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
`

export default FullScreen
