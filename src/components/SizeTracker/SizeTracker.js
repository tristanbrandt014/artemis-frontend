// @flow
import React, { Component } from "react"
import { setWindowSize } from "./../../store/actions/window"
import { connect } from "react-redux"

const mapDispatchToProps = dispatch => ({
  setWindowSize: (width, height) => dispatch(setWindowSize(width, height))
})

const withState = connect(null, mapDispatchToProps)

const enhance = withState

class SizeTracker extends Component<{}, {}> {
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.props.setWindowSize(window.innerWidth, window.innerWidth)
  }

  render() {
    return <span />
  }
}

export default enhance(SizeTracker)