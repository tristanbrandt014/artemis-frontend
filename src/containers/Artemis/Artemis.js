// @flow weak
import React, { Component } from "react"
import Aux from "react-aux"
import Seek from "../Seek/Seek"
import "keymaster"
import { FadeDown } from "./../../components"
import { assignKey, unbindKey } from "./../../utils/keymaster"
import { SEEK, openArtemis, closeArtemis } from "./../../store/actions/artemis"
import { connect } from "react-redux"

type RenderState = "SEEK" | "HUNT" | "NONE"

type Props = {
  changeState: () => RenderState,
  open: Function,
  close: Function,
  render: RenderState
}

const MapStateToProps = state => ({
  render: state.artemis
})

const MapDispatchToProps = dispatch => ({
  open: type => dispatch(openArtemis(type)),
  close: type => dispatch(closeArtemis(type))
})

const enhance = connect(MapStateToProps, MapDispatchToProps)

class Artemis extends Component<Props, {}> {
  componentDidMount() {
    assignKey("shift+down", () => this.openSeek())
  }

  commponentWillUnmount() {
    unbindKey("shift+down")
  }

  openSeek() {
    if (this.props.render === SEEK) {
      this.props.close(SEEK)
      return
    }
    this.props.open(SEEK)
  }

  // $FlowFixMe
  render() {
    return (
      <Aux>
        <FadeDown component={Seek} show={this.props.render === SEEK} />
      </Aux>
    )
  }
}

export default enhance(Artemis)
