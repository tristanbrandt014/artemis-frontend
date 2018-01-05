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
import _ from "lodash"
import defaults from "./../../utils/defaults"
import { Link } from "./../../components"

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
  const categoryColor = _.get(props.project, "category.color") || defaults.categoryColor
  const titleStyle = {
    color: getColor(categoryColor)
  }
  console.log("CATEGORY", props.category)
  return (
    <Container>
      <BackContainer>
        <Link to={props.category ? `/app/projects/category/${props.category}` : "/app/projects"}>
          <Button>
            Projects
        </Button>
        </Link>
      </BackContainer>
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
  display: flex;
  flex-flow: row nowrap;
`

const Inner = styled(Paper) `
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

const BackContainer = styled.div`
  flex: 0 0 30%;
  display: flex;
  height: 40px;
  padding-left: 10px;
`

export default enhance(ProjectHead)
