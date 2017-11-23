// @flow
import React from "react"
import styled from "styled-components"
import { green, teal, amber, grey } from "material-ui/colors"

type Props = {
  color: "COMPLETE" | "ACTIVE" | "TODO" | "ABANDONED" | "NONE",
  className?: string
}

const StatusDot = (props: Props) => {
  const getColor = () => {
    switch (props.color) {
      case "COMPLETE":
        return green[500]
      case "ACTIVE":
        return teal[500]
      case "TODO":
        return amber[500]
      case "ABANDONED":
        return grey[500]
      default:
        return "#fff"
    }
  }
  return <Status className={props.className} color={getColor()} />
}

const Status = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background-color: ${props => props.color};
`

export default StatusDot
