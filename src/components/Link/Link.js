// @flow
import React from "react"
import { push } from "react-router-redux"
import { connect } from "react-redux"

type Props = {
  to: string
}

const mapDispatchToProps = dispatch => ({
  go: to => dispatch(push(to))
})

const enhance = connect(null, mapDispatchToProps)

const Link = (props: Props) => (
  <span onClick={() => props.go(props.to)}>{props.children}</span>
)

export default enhance(Link)
