// @flow
import React,{Component} from "react"
import styled from "styled-components"
import {Typography} from "material-ui"
import {graphql} from "react-apollo"
import {GET_PROJECTS} from "./../../apollo/queries"

const enhance = graphql(GET_PROJECTS)

class Projects extends Component<{}, {}> {
  render() {
    return (
      <Container>
        {/*$FlowFixMe*/}
        <Typography type="display1">Projects</Typography>
        <Content>

        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 30px;
`

const Content = styled.div`
  height: 50px;
  background-color: red
`

export default enhance(Projects)
