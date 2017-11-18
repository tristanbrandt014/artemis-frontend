// @flow
import React, { Component } from "react"
import { FullScreen } from "../../components"
import styled from "styled-components"
// @flow
import { Typography } from "material-ui"

type Props = {
  style: Object
}

class Seek extends Component<Props, {}> {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <FullScreen>
        <Container style={this.props.style}>
          {/* $FlowFixMe */}
          <Typography>Hey!</Typography>
        </Container>
      </FullScreen>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Seek
