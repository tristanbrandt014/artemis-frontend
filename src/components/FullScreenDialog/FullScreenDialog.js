// @flow
import React from "react"
import styled from "styled-components"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import CloseIcon from "material-ui-icons/Close"
import ChevronRight from "material-ui-icons/ChevronRight"
import ChevronLeft from "material-ui-icons/ChevronLeft"
import Typography from "material-ui/Typography"

type Props = {
  close: Function,
  title: string,
  actions: any,
  children: any,
  icon?: string
}

const FullScreenDialog = (props: Props) => {
  const Actions = props.actions
  const getIcon = () => {
    switch (props.icon) {
      case "chevronRight": {
        return (<ChevronRight />)
      }
      case "chevronLeft": {
        return (<ChevronLeft />)
      }
      default: {
        return (<CloseIcon />)
      }
    }
  }
  return (
    < Container >
      {/* $FlowFixMe */}
      < Header >
        <ToolbarFlex>
          <ToolbarLeft>
            {/* $FlowFixMe */}
            <IconButton
              style={{ color: "white" }}
              onClick={props.close}
              aria-label="Close"
            >
              {getIcon()}
            </IconButton>
            {/* $FlowFixMe */}
            <Typography style={{ color: "white" }} type="title" color="inherit">
              {props.title}
            </Typography>
          </ToolbarLeft>
          <Actions />
        </ToolbarFlex>
      </Header >
      {props.children}
    </Container >
  )
}
const Header = styled(AppBar) `
  position: static !important;
  flex: 0 0 64px !important;
`

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

const ToolbarFlex = styled(Toolbar) `
  display: flex;
  justify-content: space-between;
`

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
`

export default FullScreenDialog
