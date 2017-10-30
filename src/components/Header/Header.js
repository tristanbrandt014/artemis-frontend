// @flow
import React from "react"
import styled from "styled-components"
import { Typography, Button } from "material-ui"
import { cyan } from "material-ui/colors"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { sidebar } from "./../../styles"

const MapDispatchToProps = dispatch => ({
  logout: () => dispatch(push("/logout"))
})

const enhance = connect(() => ({}), MapDispatchToProps)

type Props = {
  logout: Function
}

const Header = (props: Props) => (
  <Container>
    <Left>
      <Heading type="display1" style={{ color: "white" }}>
        Artemis
      </Heading>
    </Left>
    <Right>
      {/* $FlowFixMe */}
      <Button onClick={props.logout} style={{ color: "white" }}>
        Logout
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
  width: ${sidebar.width};
  background-color: ${cyan[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Right = styled.div`margin-right: 30px;`

const Heading = styled(Typography)`color: white;`

export default enhance(Header)
