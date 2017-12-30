// @flow weak
import React, { Component } from "react"
import Aux from "react-aux"
import Seek from "../Seek/Seek"
import SeekActions from "../Seek/Actions"
import Dialog from "material-ui/Dialog"
import Slide from "material-ui/transitions/Slide"
import { FullScreenDialog } from "./../../components"
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
    assignKey("shift+left", () => this.openSeek())
    assignKey("shift+right", () => this.props.close(SEEK))
    assignKey("esc", () => this.props.close(SEEK))
  }

  componentWillUnmount() {
    unbindKey("shift+left")
    unbindKey("shift+right")
    unbindKey("esc")
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
        <Dialog
          open={this.props.render === SEEK}
          onRequestClose={() => this.props.close(SEEK)}
          transition={SlideDown}
          fullScreen
        >
          <FullScreenDialog
            close={() => this.props.close(SEEK)}
            title="Seek"
            actions={SeekActions}
            icon="chevronRight"
          >
            <Seek />
          </FullScreenDialog>
        </Dialog>
      </Aux>
    )
  }
}

const SlideDown = props => <Slide direction="left" {...props} />

export default enhance(Artemis)
