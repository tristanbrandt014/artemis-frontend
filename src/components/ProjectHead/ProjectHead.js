//@flow
import React from "react"
import styled from "styled-components"
import { Typography, Paper, Button } from "material-ui"
import ModeEditIcon from "material-ui-icons/ModeEdit"
import MarkdownRenderer from "./../Markdown/Renderer"
import type { ProjectType } from "./../../types/project"
import type { CategoryType } from "./../../types/category"
import { connect } from "react-redux"
import { toggleUpdate } from "./../../store/actions/projects"
import hexRgb from "hex-rgb"
import {get} from "lodash"
import defaults from "./../../utils/defaults"

type Props = {
  project: ProjectType & {
    category?: CategoryType
  }
}

const mapStateToProps = state => ({
  category: state.filters.category
})

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleUpdate(open))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

const ProjectHead = (props: Props) => {
  const getColor = (color: string) => {
    const [red, green, blue] = hexRgb(color)
    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      return "#000000"
    }
    return "#ffffff"
  }
  const categoryColor = get(props.project, "category.color") || defaults.categoryColor
  const titleStyle = {
    color: getColor(categoryColor)
  }
  // console.log("CATEGORY", props.category)
  return (
    <Container>
      <Inner>
        <ColorBar color={categoryColor}>
          <Title>
            {/* $FlowFixMe */}
            <Typography style={titleStyle} type="display2">
              {props.project.name}
            </Typography>
          </Title>
          <EditButton
            onClick={() => props.toggleDialog(true)}
            fab
            color="default"
          >
            <ModeEditIcon />
          </EditButton>
        </ColorBar>
        <Description>
          {props.project.description ? <MarkdownRenderer markdown={props.project.description} /> :
            // $FlowFixMe
            <Typography>
              <i>No description</i>
            </Typography>
          }
        </Description>
      </Inner>
    </Container>
  )
}

const Container = styled.div`
  flex: 1 0 100%;
  position: relative;
  margin: 10px;
  display: flex;
  flex-flow: column nowrap;
`

const Inner = styled(Paper) `
  margin:0 auto;
  width: 100%;
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
  position: relative;
`

const Title = styled.div`
  padding: 15px;
  padding-bottom: 10px;
`

const EditButton = styled(Button) `
  bottom: -28px;
  right: 15px;
  position: absolute !important;
`

const Description = styled.div`
  padding: 15px;
  padding-top: 5px;
`

export default enhance(ProjectHead)
