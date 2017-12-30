import React, { Component } from "react"
import Button from "material-ui/Button"
import { graphql, compose } from "react-apollo"
import { connect } from "react-redux"
import { UPDATE_USER_SETTINGS } from "./../../apollo/queries"
import { get } from "lodash"
import Aux from "react-aux"
import Snackbar from "material-ui/Snackbar"
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const mapStateToProps = state => ({
  category: get(state, "filters.category")
})

const withCategory = connect(mapStateToProps, null)

const withUpdate = graphql(UPDATE_USER_SETTINGS, {
  props: ({ ownProps, mutate }) => ({
    update: () =>
      mutate({
        variables: {
          type: "category",
          value: ownProps.category
        }
      })
  })
})

const enhance = compose(withCategory, withUpdate)

class Actions extends Component<{}, {}> {
  state = {
    open: false
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  render() {
    return (
      <Aux>
        <Button style={{ color: "white" }} onClick={this.props.update}>
          Use on login
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Noted ;)</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Aux>
    )
  }
}




export default enhance(Actions)