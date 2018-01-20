// @flow
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"
import initialStore from "./hydrate.js"

import logger from "redux-logger"
import history from "./middleware/history"
import auth from "./middleware/auth"
import client from "./middleware/apollo"

const middlewares = [auth, history, client]

if (process.env.NODE_ENV !== `production`) {
  middlewares.push(logger)
}

export default createStore(
  reducers,
  initialStore,
  applyMiddleware(...middlewares)
)
