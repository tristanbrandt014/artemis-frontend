// @flow
import React, { Component } from "react"
import Card from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import styled from "styled-components"
import ArchiveDialog from "./ArchiveDialog"
import DeleteDialog from "./DeleteDialog"
import { push } from "react-router-redux"
import { connect } from "react-redux"
import Status from "./../StatusDot/StatusDot"

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(push(path))
})

const enhance = connect(null, mapDispatchToProps)

type Props = {
  name: string,
  summary: string,
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
    this.edit = this.edit.bind(this)
  }

  state = {
    archive: false,
    delete: false
  }

  edit() {
    this.props.redirect(`/app/projects/${this.props.id}`)
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
    return (
      <FullHeightCard>
        <Container>
          <Color color={this.props.color} />
          <CardContent>
            <Header>
              {/* $FlowFixMe */}
              <Heading type="headline">{this.props.name}</Heading>
              <Status color={this.props.status} />
            </Header>
            <Description>{this.props.summary}</Description>
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
              <Button onClick={this.edit} dense color="primary">
                View
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
        {/* $FlowFixMe */}
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

const Heading = styled(Typography)`
  padding: 10px 17px;
`

const FullHeightCard = styled(Card)`
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
`

export default enhance(Project)
