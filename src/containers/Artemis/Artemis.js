// @flow weak
import React, { Component } from "react"
import Aux from "react-aux"
import Seek from "../Seek/Seek"
import assignKey from "keymaster"
import { FadeDown } from "./../../components"

export const SEEK = "SEEK"
export const HUNT = "HUNT"
export const NONE = "NONE"

type RenderState = "SEEK" | "HUNT" | "NONE"

type State = {
  render: RenderState
}

type Props = {
  changeState: () => RenderState
}

class Artemis extends Component<Props, State> {
  state = {
    render: "NONE"
  }

  componentDidMount() {
    assignKey("shift+down", () => this.openSeek())
  }

  openSeek() {
    if (this.state.render === SEEK) {
      this.setState({ render: NONE })
      return
    }
    this.setState({ render: SEEK })
  }

  // $FlowFixMe
  render() {
    return (
      <Aux>
        <FadeDown component={Seek} show={this.state.render === SEEK} />
      </Aux>
    )
  }
}

export default Artemis
