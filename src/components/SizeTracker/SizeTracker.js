// @flow
import React, { Component } from "react"
import { setWindowSize } from "./../../store/actions/window"
import { connect } from "react-redux"

const mapDispatchToProps = dispatch => ({
  setWindowSize: width => dispatch(setWindowSize(width))
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
    this.props.setWindowSize(window.innerWidth)
  }

  render() {
    return <span />
  }
}

export default enhance(SizeTracker)