// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { GET_PROJECTS } from "./../../apollo/queries"
import { graphql, compose } from "react-apollo"
import { Typography, Paper } from "material-ui"
import { CircularProgress } from "material-ui/Progress"
import hexRgb from "hex-rgb"
import { StatusDot, FloatingButton } from "./../../components"
import { toggleUpdate } from "./../../store/actions/projects"
import Button from "material-ui/Button"
import ModeEditIcon from "material-ui-icons/ModeEdit"
import EditProject from "./EditProject"
import { connect } from "react-redux"
import _ from "lodash"

const withProject = graphql(GET_PROJECTS, {
  options: props => ({
    variables: {
      ids: [props.match.params.id]
    }
  })
})

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleUpdate(open))
})

const enhance = compose(withProject, connect(null, mapDispatchToProps))
class Project extends Component<{}, {}> {
  render() {
    if (this.props.data.loading) {
      // $FlowFixMe
      return <CircularProgress />
    }
    const project = this.props.data.Projects[0]

    const categoryColor = _.get(project, "category.color", "#ccc")

    const getColor = (color: string) => {
      const [red, green, blue] = hexRgb(color)
      if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
        return "#000000"
      }
      return "#ffffff"
    }

    const titleStyle = {
      color: getColor(categoryColor)
    }

    const subtitleStyle = {
      color: "#666",
      fontWeight: "600",
      paddingTop: "2px"
    }

    const hasStatus = project.status && project.status !== "NONE"
    const hasCategory = !!project.category

    let subtitle = ""

    if (hasStatus) {
      subtitle += project.status
      if (hasCategory) {
        subtitle += ", "
      }
    }
    if (hasCategory) {
      subtitle += `in ${project.category.name}`
    }
    return (
      <Container>
        <TopContainer>
          <Top>
            <ColorBar color={categoryColor}>
              <Title>
                <Typography style={titleStyle} type="display2">
                  {project.name}
                </Typography>
              </Title>
              <EditButton
                onClick={() => this.props.toggleDialog(true)}
                fab
                color="default"
              >
                <ModeEditIcon />
              </EditButton>
            </ColorBar>
            <Subtitle>
              {hasStatus && <Status color={project.status} />}
              {subtitle && (
                <Typography style={subtitleStyle}>{subtitle}</Typography>
              )}
            </Subtitle>
            <Description>
              <Typography>
                {project.description || <i>No description</i>}
              </Typography>
            </Description>
          </Top>
        </TopContainer>
        <FloatingButton type="add" color="primary" onClick={() => {}} />
        <EditProject id={this.props.match.params.id} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-top: 10px;
`

const TopContainer = styled.div`
  flex: 1 0 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`

const Top = styled(Paper)`
  flex: 0 0 40%;
  flex-flow: column nowrap;
`

const ColorBar = styled.div`
  background-color: ${props => props.color};
  width: 100%;
  height: 130px;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: space-between;
`

const Title = styled.div`
  padding: 15px;
  padding-bottom: 10px;
`
const Subtitle = styled.div`
  padding: 10px 15px;
  padding-top: 15px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const EditButton = styled(Button)`
  margin-bottom: -28px;
  margin-right: 15px;
`

const Status = styled(StatusDot)`margin-right: 10px;`

const Description = styled.div`
  padding: 15px;
  padding-top: 5px;
`

export default enhance(Project)
