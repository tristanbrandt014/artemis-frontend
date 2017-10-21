// @flow
import { ApolloClient, createNetworkInterface } from "react-apollo"
import config from './../config'

const networkInterface = createNetworkInterface({
  uri: `${config.api}/graphql`
})

export default new ApolloClient({
  networkInterface
})