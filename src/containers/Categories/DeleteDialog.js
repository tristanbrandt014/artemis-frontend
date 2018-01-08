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
import { DESTROY_CATEGORY, GET_CATEGORIES, GET_USER, GET_USER_DATA } from "./../../apollo/queries"
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
  > = graphql(DESTROY_CATEGORY, {
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
      update: (proxy, { data: { destroyCategory } }) => {
        console.dir(destroyCategory)
        const data = proxy.readQuery({
          query: GET_CATEGORIES,
          variables: {
            id: null
          }
        })
        const newData = {
          ...data,
          Categories: [
            ...data.Categories.filter(category => category.id !== destroyCategory.id)
          ]
        }
        proxy.writeQuery({
          query: GET_CATEGORIES,
          variables: {
            id: null
          },
          data: newData
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
  })

const DeleteDialog = (props: Props) => (
  // $FlowFixMe
  <Dialog open={props.open} onRequestClose={() => props.toggle(false)}>
    {/* $FlowFixMe */}
    <DialogContent>
      {/* $FlowFixMe */}
      <DialogContentText>Delete this category?</DialogContentText>
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
