// @flow
import React from "react"
import styled from "styled-components"
import { Typography, List } from "material-ui"
import { AccountCircle } from "material-ui-icons"
import { blueGrey } from "material-ui/colors"
import { sidebar } from "./../../styles"
import withUser from "./../../utils/withUser"
import Link from "./Link"
import { connect } from "react-redux"
import { compose } from "redux"
import { includes } from "lodash"

const mapStateToProps = state => ({
  window: state.window,
  category: state.filters.category
})

const withState = connect(mapStateToProps, null)

const enhance = compose(withUser, withState)

const Sidebar = props => (
  <Container>
    {!props.user.loading && (
      <Greeting>
        <AccountCircle
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        {/* $FlowFixMe */}
        <Typography
          type="subheading"
          style={{ color: "white", marginLeft: "10px" }}
        >
          Hey {props.user.User.firstname}
        </Typography>
      </Greeting>
    )}
    <List>
      <Link
        to={`/app/projects${
          props.category ? "/category/" + props.category : ""
        }`}
        match={(path, to) => includes(path, "projects")}
        name="Projects"
      />
      <Link to="/app/categories" name="Categories" />
      <Link to="/logout" name="Logout" />
    </List>
  </Container>
)

const Container = styled.div`
  flex: 0 0 ${sidebar.width};
  background-color: #fff;
  display: flex;
  z-index: 2;
  flex-flow: column nowrap;
  @media (min-width: ${sidebar.breakpoint + 1}px) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`

const Greeting = styled.div`
  display: flex;
  background-color: ${blueGrey[500]};
  justify-content: center;
  align-items: center;
  height: 70px;
  padding: 60px 25px;
  @media (min-width: ${sidebar.breakpoint + 1}px) {
    padding: 0 25px;
  }
`
export default enhance(Sidebar)
