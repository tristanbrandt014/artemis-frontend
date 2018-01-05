// @flow
import React from "react"
import styled from "styled-components"
import { Typography, List } from "material-ui"
import { AccountCircle } from "material-ui-icons"
import { blueGrey } from "material-ui/colors"
import { sidebar } from "./../../styles"
import withUser from "./../../utils/withUser"
import Link from "./Link"

import type { User } from "./../../types/user"

const enhance = withUser

type Props = {
  user: {
    User: User
  }
}

const Sidebar = (props: Props) => (
  <Container>
    {
      !props.user.loading && <Greeting>
        <AccountCircle style={{ width: "35px", height: "35px" }} color="white" />
        {/* $FlowFixMe */}
        <Typography
          type="subheading"
          style={{ color: "white", marginLeft: "10px" }}
        >
          Hey {props.user.User.firstname}
        </Typography>
      </Greeting>
    }
    <List>
      <Link to="/app/projects" name="Projects" />
      <Link to="/app/categories" name="Categories" />
    </List>
  </Container>
    )

const Container = styled.div`
  flex: 0 0 ${sidebar.width};
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  z-index: 2;
  flex-flow: column nowrap;
`

const Greeting = styled.div`
  display: flex;
  background-color: ${blueGrey[500]};
  justify-content: center;
  align-items: center;
  height: 70px;
`
export default enhance(Sidebar)
