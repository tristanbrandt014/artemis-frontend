// @flow
import React, { Component } from "react"
import { Column } from "../../components"
import styled from "styled-components"
import Categories from "./Categories"
import Filters from "./Filters"

type Props = {
  style: Object
}

class Seek extends Component<Props, {}> {
  componentDidMount() { }

  componentWillUnmount() { }

  onSubmit() {
    console.log("submit")
  }

  render() {
    return (
      <Container onSubmit={this.onSubmit} style={this.props.style}>
        {/* $FlowFixMe */}
        <Column name="Categories">
          <Categories />
        </Column>
        <Column name="Status">
          <Filters />
        </Column>
      </Container>
    )
  }
}
  

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-flow: row nowrap;
  padding: 15px;
`

export default Seek
