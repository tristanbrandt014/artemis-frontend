// @flow weak
import React, { Component } from "react"
import { ApolloProvider } from "react-apollo"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import { blueGrey, cyan } from "material-ui/colors"
import { injectGlobal } from "styled-components"
import styledNormalize from "styled-normalize"
import "typeface-roboto"
import store from "../store"
import persistStore from "../store/persist"
import client from "./../apollo"
import { ConnectedRouter } from "react-router-redux"
import history from "./../utils/history"
import Routes from "./Routes"
import "highlight.js/styles/tomorrow.css"
import { initHighlighting } from "highlight.js"
import { SizeTracker } from "./../components"
import Aux from "react-aux"

initHighlighting()
persistStore()
injectGlobal`
${styledNormalize}
* {
box-sizing: border-box;
}
html {
  min-height: 100%;
  position: relative;
}
body, #root {
  min-height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
#root {
  display: flex;
  flex-flow: column nowrap;
}
`

const theme = createMuiTheme({
  palette: {
    type: "light",
    secondary: blueGrey,
    primary: cyan
  }
})

class App extends Component<{}, {}> {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Aux>
              <Routes />
              <SizeTracker />
            </Aux>
          </ConnectedRouter>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
