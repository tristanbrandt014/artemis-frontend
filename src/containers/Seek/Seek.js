// @flow
import React, { Component } from "react"
import { Column } from "../../components"
import styled from "styled-components"
import Categories from "./Categories"
import Filters from "./Filters"
import { blueGrey } from "material-ui/colors"
import { connect } from "react-redux"
import { Paper, Tabs, Tab } from "material-ui"

import Aux from "react-aux"

const mapStateToProps = state => ({
  window: state.window
})

const enhance = connect(mapStateToProps, null)

type Props = {
  style?: Object
}

type State = {
  tab: number
}

class Seek extends Component<Props, State> {
  state = {
    tab: 0
  }

  changeTab = (e: Event, tab: number) => {
    this.setState({
      tab
    })
  }

  render() {
    return (
      <Container style={this.props.style}>
        {this.props.window.width <= 1030 ? (
          <Tabbed>
            <Tabs
              centered
              scrollable
              scrollButtons="off"
              onChange={this.changeTab}
              value={this.state.tab}
            >
              <Tab label="Categories" />
              <Tab label="Status" />
            </Tabs>
            <Content>{this.state.tab ? <Filters /> : <Categories />}</Content>
          </Tabbed>
        ) : (
          <Aux>
            <Column name="Categories">
              <Categories />
            </Column>
            <Column name="Status">
              <Filters />
            </Column>
          </Aux>
        )}
        {/* $FlowFixMe */}
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${blueGrey[500]};
  display: flex;
  flex-flow: row nowrap;
  padding: 15px;
  justify-content: space-around;
`

const Tabbed = styled(Paper)`
  flex: 1 1 auto;
  padding: 0 16px 16px 16px;
`

const Content = styled.div`
  margin-top: 20px;
`

export default enhance(Seek)
