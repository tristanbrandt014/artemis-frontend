// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { GET_PROJECT } from "./../../apollo/queries"
import Aux from "react-aux"
import { graphql, compose } from "react-apollo"
import { CircularProgress } from "material-ui/Progress"
import {
  FloatingButton,
  ProjectHead,
  Note,
  StatusCard
} from "./../../components"
import { toggleNoteDialog } from "./../../store/actions/notes"
import EditProject from "./EditProject"
import EditNote from "./EditNote"
import { connect } from "react-redux"
import { sidebar } from "./../../styles"

const withProject = graphql(GET_PROJECT, {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
})

const mapStateToProps = state => ({
  window: state.window
})

const mapDispatchToProps = dispatch => ({
  toggleNote: open => dispatch(toggleNoteDialog(open))
})

const enhance = compose(
  withProject,
  connect(mapStateToProps, mapDispatchToProps)
)
class Project extends Component<{}, {}> {
  render() {
    const width =
      this.props.window.width -
      (this.props.window.width > sidebar.breakpoint ? parseInt(sidebar.width, 10) : 0)

    // let width = this.props.window.width
    // if (width <=  s)
    if (this.props.data.loading) {
      // $FlowFixMe
      return (
        <Loader>
          <CircularProgress />
        </Loader>
      )
    }

    const project = {
      ...this.props.data.Projects[0]
    }

    let noteColumns
    let numCols

    console.log(width)
    if (width <= 500) {
      numCols = 1
      noteColumns = project.notes.reduce(
        (cols, note, index) => {
          cols[0].push(note)
          return cols
        },
        [[]]
      )
    } else if (width <= 1000) {
      numCols = 2
      noteColumns = project.notes.reduce(
        (cols, note, index) => {
          cols[(index + 1) % 2].push(note)
          return cols
        },
        [[], []]
      )
    } else {
      numCols = 3
      noteColumns = project.notes.reduce(
        (cols, note, index) => {
          cols[(index + 1) % 3].push(note)
          return cols
        },
        [[], [], []]
      )
    }

    return (
      <Container>
        <ProjectHead project={project} />
        <Notes>
          {noteColumns.map((column, colIndex) => (
            <NoteColumn
              style={{
                order: colIndex === 0 ? 2 : colIndex * 2 - 1
              }}
              key={colIndex}
              numCols={numCols}
            >
              <Aux>
                {colIndex === 0 && <StatusCard project={project} />}
                {column.map((note, noteIndex) => (
                  <Note note={note} key={note.id} />
                ))}
              </Aux>
            </NoteColumn>
          ))}
        </Notes>
        <FloatingButton
          type="add"
          color="primary"
          onClick={() => this.props.toggleNote(true)}
        />
        <EditProject id={this.props.match.params.id} />
        <EditNote project_id={this.props.match.params.id} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 10px;
`

const Notes = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 25px;
  margin-bottom: 56px;
`

const NoteColumn = styled.div`
  display: flex;
  flex: 1 1 ${props => 100 / props.numCols}%;
  max-width: ${props => 100 / props.numCols}%;
  flex-flow: column nowrap;
  padding: 10px;
`

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default enhance(Project)
