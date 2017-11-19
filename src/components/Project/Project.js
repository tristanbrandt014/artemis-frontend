// @flow
import React, { Component } from "react"
import Card from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { green, teal, amber, grey } from "material-ui/colors"
import styled from "styled-components"
import ArchiveDialog from "./ArchiveDialog"
import DeleteDialog from "./DeleteDialog"

type Props = {
  name: string,
  description: string,
  id: string,
  color: string,
  status: string,
  archived: boolean
}

type State = {
  archive: boolean,
  delete: boolean
}

class Project extends Component<Props, State> {
  constructor() {
    super()
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  state = {
    archive: false,
    delete: false
  }

  toggleDialog(dialog: "delete" | "archive", open?: boolean) {
    if (typeof open !== "boolean") {
      this.setState({
        [dialog]: !this.state[dialog]
      })
    } else {
      this.setState({
        [dialog]: open
      })
    }
  }

  render() {
    const getColor = () => {
      switch (this.props.status) {
        case "COMPLETE":
          return green[500]
        case "ACTIVE":
          return teal[500]
        case "TODO":
          return amber[500]
        case "ABANDONED":
          return grey[500]
        default:
          return "#fff"
      }
    }
    return (
      <FullHeightCard>
        <Container>
          <Color color={this.props.color} />
          <CardContent>
            <Header>
              {/* $FlowFixMe */}
              <Heading type="headline">{this.props.name}</Heading>
              <Status color={getColor()} />
            </Header>
            <Description>{this.props.description}</Description>
            <Actions>
              {/* $FlowFixMe */}
              <Button
                dense
                onClick={() => this.toggleDialog("delete", true)}
                color="accent"
              >
                Delete
              </Button>
              {/* $FlowFixMe */}
              <Button dense onClick={() => this.toggleDialog("archive", true)}>
                {this.props.archived ? `Restore` : `Archive`}
              </Button>
              {/* $FlowFixMe */}
              <Button dense color="primary">
                Edit
              </Button>
            </Actions>
          </CardContent>
        </Container>
        {/* $FlowFixMe */}
        <ArchiveDialog
          id={this.props.id}
          toggle={open => this.toggleDialog("archive", open)}
          open={this.state.archive}
          archived={this.props.archived}
        />
        <DeleteDialog
          id={this.props.id}
          toggle={open => this.toggleDialog("delete", open)}
          open={this.state.delete}
        />
      </FullHeightCard>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 auto;
`

const Color = styled.div`
  background-color: ${props => props.color};
  flex: 0 0 20px;
`

const CardContent = styled.div`
  padding-bottom: 10px;
  padding-right: 10px;
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
`

const Description = styled(Typography)`
  padding-left: 17px;
  padding-bottom: 10px;
  flex: 1 0 auto;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
`

const Heading = styled(Typography)`padding: 10px 17px;`

const Status = styled.div`
  margin-right: 24px;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background-color: ${props => props.color};
`

const FullHeightCard = styled(Card)`
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
`

export default Project
