// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { TextField, Tabs, Tab } from "material-ui"
import Renderer from "./Renderer"

type Props = {
  value: string,
  onChange: (value: string) => void,
  name: string,
  description: string
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
            <TextField
              onChange={e => {
                this.props.onChange(e.target.value)
              }}
              value={this.props.value}
              style={{ width: "100%" }}
              placeholder={this.props.description}
              multiline
              rows={17}
            />
          </Section>
        ) : (
          <Section>
            <Renderer markdown={this.props.value} />
          </Section>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  width: 100%;
`

const Section = styled.div`
  padding: 20px 0;
`

export default Markdown
