// queries
import GET_PROJECTS from "./queries/getProjects.gql"
import GET_CATEGORIES from "./queries/getCategories.gql"

// mutations
import UPDATE_PROJECT from "./mutations/updateProject.gql"
import CREATE_PROJECT from "./mutations/createProject.gql"
import DESTROY_PROJECT from "./mutations/destroyProject.gql"

export {
  // queries
  GET_PROJECTS,
  GET_CATEGORIES,
  // mutations
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DESTROY_PROJECT
}
