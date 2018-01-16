// @flow
import React, { Component } from "react"
import styled from "styled-components"
import { Typography } from "material-ui"
import { CircularProgress } from "material-ui/Progress"
import { graphql, compose } from "react-apollo"
import { connect } from "react-redux"
import _ from "lodash"
import { toggleCreate } from "./../../store/actions/projects"
import { GET_PROJECTS, GET_CATEGORIES } from "./../../apollo/queries"
import { FloatingButton } from "./../../components"
import AddProject from "./AddProject"
import { ARCHIVED, ALL, NONE } from "./../../utils/filters"
import Mobile from "./Mobile"
import Desktop from "./Desktop"

const withProjects = graphql(GET_PROJECTS)

const withCategories = graphql(GET_CATEGORIES, {
  name: "categories",
  options: props => ({
    ...(props.match.params.type === "category"
      ? {
          variables: {
            id: props.match.params.value
          }
        }
      : {})
  })
})

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleCreate(open))
})

const mapStateToProps = state => ({
  filters: state.filters,
  window: state.window
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProjects,
  withCategories
)

class Projects extends Component<{}, {}> {
  getTitle = () => {
    const names = []
    if (this.props.match.params.type === "category") {
      if (this.props.categories.loading) {
        return <CircularProgress />
      }
      names.push(this.props.categories.Categories[0].name)
    } else {
      names.push("Projects")
    }

    if (_.get(this.props, "filters.archived") === ARCHIVED) {
      names.unshift("Archives: ")
    }
    if (_.get(this.props, "filters.archived") === ALL) {
      names.unshift("All ")
    }
    if (
      _.get(this.props, "filters.status") &&
      !_.includes([ALL, NONE], _.get(this.props, "filters.status"))
    ) {
      names.push(", " + _.capitalize(this.props.filters.status))
    }
    return names.join("")
  }
  filterProjects = projects => {
    const filters = []
    const { params } = this.props.match
    if (params.type === "category") {
      const categoryId = params.value
      const byCategory = projects =>
        projects.filter(project => _.get(project, "category.id") === categoryId)
      filters.push(byCategory)
    }
    if (
      _.get(this.props, "filters.archived") &&
      this.props.filters.archived !== ALL
    ) {
      const archiveState = this.props.filters.archived === ARCHIVED
      const byArchived = projects =>
        projects.filter(project => project.archived === archiveState)
      filters.push(byArchived)
    }
    if (
      _.get(this.props, "filters.status") &&
      this.props.filters.status !== ALL
    ) {
      const status = this.props.filters.status
      const byStatus = projects =>
        projects.filter(project => project.status === status)
      filters.push(byStatus)
    }

    const requested = _.flow(filters)
    return requested(projects)
  }

  getProjects = () => this.filterProjects(this.props.data.Projects)

  render() {
    const projects = !this.props.data.loading ? this.getProjects() : []
    if (
      _.get(this.props, "match.params.type") === "category" &&
      !_.get(this.props, "categories.Categories[0].name")
    ) {
      return (
        <Container>
          <Typography>Invalid Category</Typography>
        </Container>
      )
    }
    return (
      <Container>
        {this.props.window.width <= 500 ? (
          <Mobile
            projects={projects}
            title={this.getTitle()}
            loading={this.props.data.loading}
          />
        ) : (
          <Desktop
            projects={projects}
            title={this.getTitle()}
            loading={this.props.data.loading}
          />
        )}
        {/*$FlowFixMe*/}

        <FloatingButton
          onClick={() => this.props.toggleDialog(true)}
          type="add"
          color="primary"
        />
        <AddProject />
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 30px;
`

// $FlowFixMe
export default enhance(Projects)
