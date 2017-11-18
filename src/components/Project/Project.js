// @flow
import React from "react"
import Card from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { green, teal, amber, grey } from "material-ui/colors"
import styled from "styled-components"
import { graphql } from "react-apollo"
import type { OperationComponent, QueryProps } from "react-apollo"
import { UPDATE_PROJECT } from "./../../apollo/queries"
import type { ProjectType } from "./../../types/project"

type Response = {
  Projects: Array<ProjectType>
}

type Props = {
  name: string,
  description: string,
  id: string,
  color: string,
  status: string
}

type AllProps = Response & QueryProps & Props

const enhance: OperationComponent<
  Response,
  Props,
  AllProps
> = graphql(UPDATE_PROJECT, {
  props: ({ ownProps, mutate }) => ({
    archive: () =>
      mutate({
        variables: {
          id: ownProps.id,
          archived: true
        }
      })
  })
})

const Project = (props: Props) => {
  const getColor = () => {
    switch (props.status) {
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
        <Color color={props.color} />
        <CardContent>
          <Header>
            {/* $FlowFixMe */}
            <Heading type="headline">{props.name}</Heading>
            <Status color={getColor()} />
          </Header>
          <Description>{props.description}</Description>
          <Actions>
            {/* $FlowFixMe */}
            <Button onClick={props.archive} color="accent">
              Archive
            </Button>
            {/* $FlowFixMe */}
            <Button color="primary">Edit</Button>
          </Actions>
        </CardContent>
      </Container>
    </FullHeightCard>
  )
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
  flex: 1 0 100%;
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

export default enhance(Project)
