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
import { UPDATE_PROJECT, GET_USER, GET_USER_DATA } from "./../../apollo/queries"
import type { ProjectType } from "./../../types/project"

type Response = {
  Projects: Array<ProjectType>
}

type Props = {
  open: boolean,
  toggle: (open: boolean) => void,
  archived: boolean,
  id: string
}

type AllProps = Response & QueryProps & Props

const enhance: OperationComponent<
  Response,
  Props,
  AllProps
> = graphql(UPDATE_PROJECT, {
  props: ({ ownProps, mutate }) => ({
    archive: () =>
      mutate({
        variables: {
          id: ownProps.id,
          archived: !ownProps.archived
        }
      })
  }),
  options: {
    refetchQueries: [
      {
        query: GET_USER
      },
      {
        query: GET_USER_DATA
      }
    ]
  }
})

const ArchiveDialog = (props: Props) => (
  // $FlowFixMe
  <Dialog open={props.open} onClose={() => props.toggle(false)}>
    {/* $FlowFixMe */}
    <DialogContent>
      {/* $FlowFixMe */}
      <DialogContentText>
        {props.archived ? "Restore" : "Archive"} this project?
      </DialogContentText>
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
          props.archive()
        }}
      >
        {props.archived ? "Restore" : "Archive"}
      </Button>
    </DialogActions>
  </Dialog>
)

export default enhance(ArchiveDialog)
