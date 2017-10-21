// @flow
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import App from "./containers/App"
import registerServiceWorker from "./registerServiceWorker"
registerServiceWorker()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    //$FlowFixMe
    document.getElementById("root")
  )
}

render(App)

if (module.hot) {
  //$FlowFixMe  
  module.hot.accept("./containers/App", () => {
    render(App)
  })
}
