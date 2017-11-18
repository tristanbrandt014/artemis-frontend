// @flow
import React from "react"
import styled from "styled-components"
import Button from "material-ui/Button"
import AddIcon from "material-ui-icons/Add"

type Props = {
  type: "add",
  color: "primary",
  onClick: Function
}

const FloatingButton = (props: Props) => {
  const getIcon = () => {
    switch (props.type) {
      case "add":
        return <AddIcon color="white" />
      default:
        return <AddIcon color="white" />
    }
  }
  return (
    <Container>
      {/* $FlowFixMe */}
      <Button onClick={props.onClick} fab color={props.color}>
        {getIcon()}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`

export default FloatingButton
