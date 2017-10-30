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

persistStore()
injectGlobal`
${styledNormalize}
* {
box-sizing: border-box;
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
            <Routes />
          </ConnectedRouter>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
