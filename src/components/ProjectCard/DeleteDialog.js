// @flow
import React from "react"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog"
import { graphql } from "react-apollo"
import type { OperationComponent, QueryProps } from "react-apollo"
import { DESTROY_PROJECT, GET_PROJECTS } from "./../../apollo/queries"
import type { ProjectType } from "./../../types/project"

type Response = {
  Projects: Array<ProjectType>
}

type Props = {
  open: boolean,
  toggle: (open: boolean) => void,
  id: string
}

type AllProps = Response & QueryProps & Props

const enhance: OperationComponent<
  Response,
  Props,
  AllProps
> = graphql(DESTROY_PROJECT, {
  props: ({ ownProps, mutate }) => ({
    delete: () =>
      mutate({
        variables: {
          id: ownProps.id
        }
      })
  }),
  //$FlowFixMe
  options: {
    update: (proxy, { data: { destroyProject } }) => {
      const data = proxy.readQuery({
        query: GET_PROJECTS,
        variables: {
          ids: null,
          category: null,
          archived: null
        }
      })
      const newData = {
        ...data,
        Projects: data.Projects.filter(
          project => project.id !== destroyProject.id
        )
      }
      proxy.writeQuery({
        query: GET_PROJECTS,
        variables: {
          ids: null,
          category: null,
          archived: null
        },
        data: newData
      })
    }
  }
})

const ArchiveDialog = (props: Props) => (
  // $FlowFixMe
  <Dialog open={props.open} onRequestClose={() => props.toggle(false)}>
    {/* $FlowFixMe */}
    <DialogContent>
      {/* $FlowFixMe */}
      <DialogContentText>Delete this project?</DialogContentText>
    </DialogContent>
    {/* $FlowFixMe */}
    <DialogActions>
      {/* $FlowFixMe */}
      <Button onClick={() => props.toggle(false)}>Cancel</Button>
      {/* $FlowFixMe */}
      <Button
        color="primary"
        onClick={async () => {
          props.toggle(false)
          props.delete()
        }}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

export default enhance(ArchiveDialog)
