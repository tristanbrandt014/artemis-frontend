//@flow
import React from "react"
import { Container, Inner } from "./../Note/Note"
import type { ProjectType } from "./../../types/project"
import type { CategoryType } from "./../../types/category"
import styled from "styled-components"
import { Typography } from "material-ui"
import StatusDot from "./../StatusDot/StatusDot"

type Props = {
  project: ProjectType & {
    category?: CategoryType
  }
}

const StatusCard = (props: Props) => {
  const hasStatus = props.project.status && props.project.status !== "NONE"
  const hasCategory = !!props.project.category
  const subtitleStyle = {
    color: "#666",
    fontWeight: "600",
    paddingTop: "2px"
  }

  const labelStyle = {
    fontWeight: 500,
    marginRight: "15px"
  }
  return (
    <Container>
      <Inner>
        {hasStatus && (
          <StatusLine>
            <Typography style={labelStyle}>Status:</Typography>
            <Status color={props.project.status} />
            <Typography style={subtitleStyle}>{props.project.status}</Typography>
          </StatusLine>
        )}
        {hasCategory && (
          <StatusLine>
            <Typography style={labelStyle}>Category:</Typography>
            <Typography style={subtitleStyle}>
              {props.project.category.name}
            </Typography>
          </StatusLine>
        )}
      </Inner>
    </Container>
  )
}

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Status = styled(StatusDot)`
  margin-right: 10px;
`

export default StatusCard
