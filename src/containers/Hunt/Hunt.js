// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { TextField } from "material-ui"
import { withStyles } from 'material-ui/styles'
import withUser from "../../utils/withUser"
import lunr from "lunr"
import { flatten } from "lodash"
import { compose } from "redux"
import { GET_USER_DATA } from "./../../apollo/queries"
import { graphql } from "react-apollo"
import Column from "./Column"
import { SearchItem } from "./../../components"
import _ from "lodash"
import defaults from "./../../utils/defaults"
import { push } from "react-router-redux"
import { connect } from "react-redux"
import { NONE, openArtemis } from "./../../store/actions/artemis"
import removeMD from "remove-markdown"
const withUserData = graphql(GET_USER_DATA)

type State = {
  search: string
}

const styles = theme => ({
  textFieldInput: {
    fontSize: 35,
    // color: "white",
    fontWeight: 300
  }
})

const mapDispatchToProps = dispatch => ({
  go: (to) => dispatch(push(to)),
  close: () => dispatch(openArtemis(NONE))
})

const withDispatch = connect(null, mapDispatchToProps)

const enhance = compose(withUser, withUserData, withStyles(styles), withDispatch)

class Hunt extends Component<{}, State> {
  notes: any
  projects: any
  dataVersion: string = ""
  state = {
    search: ""
  }

  componentDidMount() {
    this.indexNotes()
    this.indexProjects()
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.user.loading && !newProps.user.error && !newProps.data.loading && !newProps.data.error) {
      const user = newProps.user.User
      if (this.dataVersion !== user.dataVersion || this.getUserData() === undefined) {
        this.indexNotes()
        this.indexProjects()
      }
    }
  }

  getUserData = () => {
    const data = this.props.data
    return data.Projects
  }

  indexNotes = () => {
    const userData = this.getUserData()
    if (userData === undefined) {
      return
    }
    const notes = flatten(userData.map(({ notes }) => notes)).map(note => ({
      ...note,
      body: removeMD(note.body)
    }))
    this.notes = lunr(function () {
      this.ref('id')
      this.field('body')

      notes.forEach(note => {
        this.add(note)
      })
    })
  }

  indexProjects = () => {
    const userData = this.getUserData()
    if (userData === undefined) {
      return
    }
    this.projects = lunr(function () {
      this.ref("id")
      this.field("name")
      this.field("description")

      userData.forEach(project => {
        this.add(project)
      })
    })
  }

  buildSearch = (search: string): string => {
    const terms = search.split(" ").filter(term => term !== " ")
    return terms.reduce(
      (searchString, term) =>
        term ? `${searchString} ${term}^10 ${term}*^5 *${term}* *${term} ` : searchString
      , ''
    )
  }

  render() {
    let notes = []
    let projects = []
    if (this.state.search) {
      const search = this.buildSearch(this.state.search)
      const notes_results = this.notes.search(search)
      const projects_results = this.projects.search(search)
      notes_results.forEach(res => notes.push(res))
      projects_results.forEach(res => projects.push(res))
    }
    return (
      <Container>
        <Wrapper>
          <SearchContainer>
            <TextField
              id="search"
              label="Search"
              type="search"
              margin="normal"
              fullWidth
              value={this.state.search}
              autoFocus
              onChange={e => this.setState({ search: e.target.value })}
              InputProps={{
                classes: {
                  input: this.props.classes.textFieldInput
                },
              }}
            />
          </SearchContainer>
        </Wrapper>
        <Results>
          <Column show={!!projects.length} name="Projects">
            {
              projects.slice(0, Math.min(projects.length, 10)).map(res => {
                const project = this.getUserData().reduce((result, _project) => {
                  if (_project.id === res.ref) {
                    return _project
                  }
                  return result
                })
                return (
                  <SearchItem
                    title={project.name}
                    onClick={() => {
                      this.props.go(`/app/projects/view/${project.id}`)
                      this.props.close()
                    }}
                    isArchived={project.archived}
                    key={project.id}
                    color={
                      _.get(project, "category.color") || defaults.categoryColor
                    }
                  />
                )
              })
            }
          </Column>
          <Column show={!!notes.length} name="Notes">
            {notes.slice(0, Math.min(notes.length, 10)).map(res => {
              const note = flatten(this.getUserData().map(project => {
                return project.notes.map(_n => ({
                  ..._n,
                  project
                }))
              })).reduce((result, _note) => {
                if (_note.id === res.ref) {
                  return _note
                }
                return result
              })

              const title = removeMD(note.body).substring(0, 35) + "..."
              return (
                <SearchItem
                  title={title}
                  small
                  onClick={() => {
                    this.props.go(`/app/projects/view/${note.project.id}#${note.id}`)
                    this.props.close()
                  }}
                  isArchived={note.project.archived}
                  key={note.id}
                  color={
                    _.get(note.project, "category.color") || defaults.categoryColor
                  }
                />
              )
            })}
          </Column>
        </Results>
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  background-color: ${blueGrey[50]};
  display: flex;
  flex-flow: column nowrap;
  padding: 15px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
`

const SearchContainer = styled.div`
  padding: 16px;
  display: flex;
  flex: 0 0 50%;
`

const Results = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 100%;
`

export default enhance(Hunt)