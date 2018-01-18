// @flow
import React, { Component } from "react"
import Card from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import styled from "styled-components"
import { push } from "react-router-redux"
import { connect } from "react-redux"
import Status from "./../StatusDot/StatusDot"
import _ from "lodash"
import { ALL } from "./../../utils/filters"
import ProjectActions from "./../ProjectActions/ProjectActions"
import Aux from "react-aux"

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(push(path))
})

const mapStateToProps = state => ({
  filters: state.filters
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

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
    this.edit = this.edit.bind(this)
  }

  state = {
    archive: false,
    delete: false
  }

  edit() {
    this.props.redirect(`/app/projects/view/${this.props.id}`)
  }

  render() {
    return (
      <FullHeightCard style={this.props.archived ? { opacity: 0.4 } : {}}>
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
              <ProjectActions
                id={this.props.id}
                archived={this.props.archived}
                render={toggleDialog => (
                  <Aux>
                    {/* $FlowFixMe */}
                    <Button
                      dense
                      onClick={() => toggleDialog("delete", true)}
                      color="accent"
                    >
                      Delete
                    </Button>
                    {/* $FlowFixMe */
                    _.get(this.props, "filters.archived") !== ALL && (
                      <Button
                        dense
                        onClick={() => toggleDialog("archive", true)}
                      >
                        {this.props.archived ? `Restore` : `Archive`}
                      </Button>
                    )}
                    {/* $FlowFixMe */}
                    <Button onClick={this.edit} dense color="primary">
                      View
                    </Button>
                  </Aux>
                )}
              />
            </Actions>
          </CardContent>
        </Container>
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
  flex: 1 1 auto;
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
