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
import { UPDATE_PROJECT } from "./../../apollo/queries"
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
> = graphql(UPDATE_PROJECT, {
  props: ({ ownProps, mutate }) => ({
    archive: () =>
      mutate({
        variables: {
          id: ownProps.id,
          archived: true
        }
      })
  })
})

const ArchiveDialog = (props: Props) => (
  // $FlowFixMe
  <Dialog open={props.open} onRequestClose={() => props.toggle(false)}>
    {/* $FlowFixMe */}
    <DialogContent>
      {/* $FlowFixMe */}
      <DialogContentText>Archive this project?</DialogContentText>
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
        Archive
      </Button>
    </DialogActions>
  </Dialog>
)

export default enhance(ArchiveDialog)
