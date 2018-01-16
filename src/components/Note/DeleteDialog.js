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
import { DESTROY_NOTE, GET_PROJECT, GET_USER, GET_USER_DATA } from "./../../apollo/queries"
import type { NoteType } from "./../../types/note"

type Response = {
  Note: NoteType
}

type Props = {
  open: boolean,
  toggle: (open: boolean) => void,
  id: string
}

type AllProps = Response & QueryProps & Props

const enhance: OperationComponent<Response, Props, AllProps> = graphql(
  DESTROY_NOTE,
  {
    props: ({ ownProps, mutate }) => ({
      delete: () =>
        mutate({
          variables: {
            id: ownProps.id
          }
        })
    }),
    //$FlowFixMe
    options: props => ({
      update: (proxy, { data: { destroyNote } }) => {
        // console.dir(destroyNote)
        const data = proxy.readQuery({
          query: GET_PROJECT,
          variables: {
            id: destroyNote.project.id
          }
        })
        data.Projects[0].notes = data.Projects[0].notes.filter(
          note => note.id !== destroyNote.id
        )
        proxy.writeQuery({
          query: GET_PROJECT,
          variables: {
            id: destroyNote.project.id
          },
          data
        })
      },
      refetchQueries: [
        {
          query: GET_USER
        },
        {
          query: GET_USER_DATA
        }
      ]
    })

  }
)

const DeleteDialog = (props: Props) => (
  // $FlowFixMe
  <Dialog open={props.open} onRequestClose={() => props.toggle(false)}>
    {/* $FlowFixMe */}
    <DialogContent>
      {/* $FlowFixMe */}
      <DialogContentText>Delete this note?</DialogContentText>
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

export default enhance(DeleteDialog)
