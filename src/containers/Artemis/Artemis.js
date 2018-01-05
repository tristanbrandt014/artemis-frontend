// @flow weak
import React, { Component } from "react"
import Aux from "react-aux"
import Seek from "../Seek/Seek"
import SeekActions from "../Seek/Actions"
import Hunt from "../Hunt/Hunt"
import HuntActions from "./../Hunt/Actions"
import Dialog from "material-ui/Dialog"
import Slide from "material-ui/transitions/Slide"
import { FullScreenDialog } from "./../../components"
import { assignKey, unbindKey } from "./../../utils/keymaster"
import { SEEK, NONE, HUNT, openArtemis, closeArtemis } from "./../../store/actions/artemis"
import { connect } from "react-redux"

type RenderState = typeof SEEK | typeof HUNT | typeof NONE

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
    assignKey("shift+left", () => this.changeState({ to: SEEK }))
    assignKey("shift+right", () => this.changeState({ to: HUNT }))
    assignKey("esc", () => this.changeState({ to: NONE }))
  }

  componentWillUnmount() {
    unbindKey("shift+left")
    unbindKey("shift+right")
    unbindKey("esc")
  }

  changeState = (options: {
    to: typeof SEEK | typeof HUNT,
    force?: boolean
  }) => {
    if (this.props.render === NONE || options.force) {
      this.props.open(options.to)
    } else {
      this.props.open(NONE)
    }

  }

  // $FlowFixMe
  render() {
    return (
      <Aux>
        <Dialog
          open={this.props.render === SEEK}
          onRequestClose={() => this.changeState({ to: NONE })}
          transition={SlideLeft}
          fullScreen
        >
          <FullScreenDialog
            close={() => this.changeState({ to: NONE })}
            title="Seek"
            actions={SeekActions}
            icon="chevronRight"
          >
            <Seek />
          </FullScreenDialog>
        </Dialog>
        <Dialog
          open={this.props.render === HUNT}
          onRequestClose={() => this.changeState({ to: NONE })}
          transition={SlideRight}
          fullScreen
        >
          <FullScreenDialog
            close={() => this.changeState({ to: NONE })}
            title="Hunt"
            actions={HuntActions}
            icon="chevronLeft"
          >
            <Hunt />
          </FullScreenDialog>
        </Dialog>
      </Aux>
    )
  }
}

const SlideLeft = props => <Slide direction="left" {...props} />
const SlideRight = props => <Slide direction="right" {...props} />

export default enhance(Artemis)
