// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { logoutAction } from "./../../store/actions/auth"
import local from "./../../utils/localstorage"

const MapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  redirect: path => dispatch(push(path))
})

const enhance = connect(() => ({}), MapDispatchToProps)

type Props = {
  logout: () => void,
  redirect: (path: string) => void
}

class Logout extends Component<Props, {}> {
  componentWillMount() {
    local.clear("store")
    this.props.logout()
    this.props.redirect("/login")
  }

  render() {
    return <div />
  }
}

export default enhance(Logout)
