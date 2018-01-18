// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Tabs, Tab } from "material-ui"
import Renderer from "./Renderer"
import { connect } from "react-redux"
import { breakpoints } from "./../../styles"

const mapStateToProps = state => ({
  window: state.window
})

const enhance = connect(mapStateToProps, null)

type Props = {
  value: string,
  onChange: (value: string) => void,
  name: string,
  description: string,
  autoFocus?: boolean,
  minHeight?: number
}

type State = {
  tab: number
}

export class Markdown extends Component<Props, State> {
  static defaultProps = {
    value: "",
    onChange: () => {}
  }

  state = {
    tab: 0
  }

  changeTab = (e: Event, tab: number) => {
    this.setState({
      tab
    })
  }

  render() {
    const { tab } = this.state

    return (
      <Container>
        <Header>
          <Tabs
            centered
            scrollable
            scrollButtons="off"
            onChange={this.changeTab}
            value={tab}
          >
            <Tab label={this.props.name} />
            <Tab label="PREVIEW" />
          </Tabs>
        </Header>

        {tab === 0 ? (
          <Section>
            <textarea
              onChange={e => {
                this.props.onChange(e.target.value)
              }}
              value={this.props.value}
              style={{
                width: "100%",
                height: "100%",
                resize: "none",
                padding: "15px",
                minHeight:
                  this.props.window.width <= breakpoints.tablet
                    ? this.props.minHeight ? this.props.minHeight : 0
                    : 0
              }}
              autoFocus={this.props.autoFocus}
              placeholder={this.props.description}
            />
          </Section>
        ) : (
          <Section style={{ overflowY: "auto" }}>
            <Renderer markdown={this.props.value} />
          </Section>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 48px;
`

const Section = styled.div`
  padding: 20px 0;
  flex: 1 1 100%;
`

export default enhance(Markdown)
