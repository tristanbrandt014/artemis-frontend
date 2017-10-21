// @flow
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"
import initialStore from "./hydrate.js"

import logger from "redux-logger"
import history from "./middleware/history"
import auth from "./middleware/auth"

export default createStore(
  reducers,
  initialStore,
  applyMiddleware(auth, history, logger)
)
