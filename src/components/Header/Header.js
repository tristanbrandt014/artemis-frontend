// @flow
import React from "react"
import styled from "styled-components"
import { Typography, Button, IconButton } from "material-ui"
import MenuIcon from "material-ui-icons/Menu"
import { cyan } from "material-ui/colors"
import { connect } from "react-redux"
import { sidebar, breakpoints } from "./../../styles"
import { openArtemis, SEEK, HUNT } from "./../../store/actions/artemis"
import { toggleSidebar } from "./../../store/actions/sidebar"

const mapDispatchToProps = dispatch => ({
  seek: () => dispatch(openArtemis(SEEK)),
  hunt: () => dispatch(openArtemis(HUNT)),
  toggleSidebar: open => dispatch(toggleSidebar(open))
})

const mapStateToProps = state => ({
  window: state.window
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

type Props = {
  logout: Function
}

const Header = (props: Props) => (
  <Container>
    <Left>
      {props.window.width <= sidebar.breakpoint && (
        <IconButton onClick={() => props.toggleSidebar(true)}>
          <MenuIcon color="white" />
        </IconButton>
      )}
      <Heading
        type={props.window.width > sidebar.breakpoint ? "display1" : "headline"}
        style={{ color: "white" }}
      >
        Artemis
      </Heading>
    </Left>
    <Right>
      {/* $FlowFixMe */}
      <Button
        dense={props.window.width <= breakpoints.mobile}
        onClick={props.seek}
        style={{ color: "white" }}
      >
        Seek
      </Button>
      {/* $FlowFixMe */}
      <Button
        dense={props.window.width <= breakpoints.mobile}
        onClick={props.hunt}
        style={{ color: "white" }}
      >
        Hunt
      </Button>
    </Right>
  </Container>
)

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: ${cyan[500]};
  flex: 0 0 60px;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const Left = styled.div`
  height: 60px;
  flex: 0 0 auto;
  background-color: ${cyan[500]};
  display: flex;
  align-items: center;
  /* justify-content: center; */
`

const Right = styled.div`
  margin-right: 30px;
  flex: 1 1 100%;
  display: flex;
  justify-content: flex-end;
`

const Heading = styled(Typography)`
  color: white;
`

export default enhance(Header)
