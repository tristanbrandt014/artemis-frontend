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
            <StyledTabs
              centered
              scrollable
              scrollButtons="off"
              onChange={this.changeTab}
              value={this.state.tab}
            >
              <Tab label="Categories" />
              <Tab label="Status" />
            </StyledTabs>
            <Wrapper>
              <Content>{this.state.tab ? <Filters /> : <Categories />}</Content>
            </Wrapper>
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
  flex: 1 1 100%;
  height: 100%;
  background-color: ${blueGrey[500]};
  display: flex;
  padding: 15px;
  justify-content: space-around;
  flex-flow: column nowrap;
  @media (min-width: 1030px) {
    flex-flow: row nowrap;
  }
`

const Tabbed = styled(Paper)`
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
`

const StyledTabs = styled(Tabs)`
  flex: 0 0 auto;
`

const Content = styled.div`
  padding-top: 20px;
`

const Wrapper = styled.div`
  padding: 0 16px 16px 16px;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 100%;
  overflow-y: auto;
`

export default enhance(Seek)
