// @flow
import { graphql } from "react-apollo"
import { GET_USER } from "./../apollo/queries"

const withUser = graphql(GET_USER, {
  name: "user"
})

export default withUser
