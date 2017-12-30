// queries
import GET_PROJECTS from "./queries/getProjects.gql"
import GET_CATEGORIES from "./queries/getCategories.gql"
import GET_NOTES from "./queries/getNotes.gql"
import GET_PROJECT from "./queries/getProject.gql"
import GET_USER from "./queries/getUser.gql"

// mutations
import UPDATE_PROJECT from "./mutations/updateProject.gql"
import CREATE_PROJECT from "./mutations/createProject.gql"
import DESTROY_PROJECT from "./mutations/destroyProject.gql"
import CREATE_NOTE from "./mutations/createNote.gql"
import UPDATE_NOTE from "./mutations/updateNote.gql"
import DESTROY_NOTE from "./mutations/destroyNote.gql"
import UPDATE_USER_SETTINGS from "./mutations/updateUserSettings.gql"

export {
  // queries
  GET_PROJECTS,
  GET_CATEGORIES,
  GET_NOTES,
  GET_PROJECT,
  GET_USER,
  // mutations
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DESTROY_PROJECT,
  CREATE_NOTE,
  UPDATE_NOTE,
  DESTROY_NOTE,
  UPDATE_USER_SETTINGS
}
