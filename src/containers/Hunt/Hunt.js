// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { blueGrey } from "material-ui/colors"
import { Paper, TextField } from "material-ui"
import { withStyles } from 'material-ui/styles'
import withUser from "../../utils/withUser"
import local from "./../../utils/localstorage"
import lunr from "lunr"
import { flatten } from "lodash"
import { compose } from "redux"


type State = {
  search: string
}

const styles = theme => ({
  textFieldInput: {
    fontSize: 35
  }
})

const enhance = compose(withUser, withStyles(styles))


class Hunt extends Component<{}, State> {
  notes: any
  projects: any
  state = {
    search: ""
  }

  componentDidMount() {
    this.indexNotes()
    this.indexProjects()
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.user.loading && !newProps.user.error) {
      const user = newProps.user.User
      const dataVersion = local.get("dataVersion")
      if (dataVersion !== user.dataVersion) {
        this.indexNotes()
        this.indexProjects()
      }
    }
  }

  getUserData = () => {
    return JSON.parse(local.get("userData"))
  }

  indexNotes = () => {
    const userData = this.getUserData()
    const notes = flatten(userData.map(({ notes }) => notes))
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
    this.projects = lunr(function () {
      this.ref("id")
      this.field("name")
      this.field("description")

      userData.forEach(project => {
        this.add(project)
      })
    })
  }

  render() {
    let notes = []
    let projects = []
    if (this.state.search) {
      const search = `*${this.state.search}*`
      const notes_results = this.notes.search(search)
      const projects_results = this.projects.search(search)
      notes_results.forEach(res => notes.push(res.ref))
      projects_results.forEach(res => projects.push(res.ref))      
    }
    return (
      <Container>
        <Wrapper>
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
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${blueGrey[500]};
  display: flex;
  flex-flow: row nowrap;
  padding: 15px;
  justify-content: space-around;
`

const Wrapper = styled(Paper) `
  flex: 0 0 50%;
  padding: 16px
`

export default enhance(Hunt)