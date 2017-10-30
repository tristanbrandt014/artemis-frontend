// @flow weak
import React, { Component } from "react"
import Aux from "react-aux"
import Seek from "../Seek/Seek"
import assignKey from "keymaster"
import { spring, TransitionMotion } from "react-motion"
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

  willLeave() {
    return { opacity: spring(0), marginTop: spring(-30) }
  }

  didEnter() {
    return { opacity: spring(1), marginTop: spring(0) }
  }

  willEnter() {
    return { opacity: 0, marginTop: -30 }
  }

  // $FlowFixMe
  render() {
    return (
      <TransitionMotion
        defaultStyles={[
          {
            key: SEEK,
            style: {
              opacity: 0,
              marginTop: -30
            },
            data: Seek
          }
        ]}
        styles={() => [
          ...(this.state.render === SEEK
            ? [
                {
                  key: SEEK,
                  style: {
                    opacity: spring(1),
                    marginTop: spring(0)
                  },
                  data: Seek
                }
              ]
            : [])
        ]}
        willLeave={this.willLeave}
        didEnter={this.didEnter}
        willEnter={this.willEnter}
      >
        {interpolated => (
          <Aux>
            {interpolated.map(({ key, style, data: C }) => (
              // $FlowFixMe
              <C style={style} key={`${key}-transition`} />
            ))}
          </Aux>
        )}
      </TransitionMotion>
    )
  }
}

export default Artemis
