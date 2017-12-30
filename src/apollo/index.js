// @flow
import { ApolloClient, createNetworkInterface } from "react-apollo"
import config from './../config'
import local from "./../utils/localstorage"

const networkInterface = createNetworkInterface({
  uri: `${config.api}/graphql`
})

// $FlowFixMe
networkInterface.use([{
  applyMiddleware: (req, next) => {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const storage = local.get("store")
    const token = JSON.parse(storage).auth.token
    req.options.headers['authorization'] = token ? token : null;
    next();
  }
}])

// $FlowFixMe
networkInterface.useAfter([{
  applyAfterware: (res, next) => {
    if (res.response.status === 401) {
      window.location = ("/logout")
    }
    next()
  }
}])

export default new ApolloClient({
  networkInterface
})