// @flow
import React from "react"
import { ListItem, ListItemText } from "material-ui/List"
import { withStyles, withTheme } from "material-ui/styles"
import { compose } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

type Props = {
  redirect: Function,
  to: string,
  name: string,
  path: string,
  classes: {
    button: Object,
    text: Object,
    hover: Object
  }
}

const MapStateToProps = state => ({
  path: state.routing.location.pathname
})

const MapDispatchToProps = (dispatch, ownProps: Props) => ({
  redirect: () => dispatch(push(ownProps.to))
})

const styles = theme => ({
  button: {
    backgroundColor: theme.palette.secondary[200]
  }
})

const enhance = compose(
  withStyles(styles),
  withTheme(),
  connect(MapStateToProps, MapDispatchToProps)
)

const Link = (props: Props) => {
  const active = props.path.includes(props.to)
  return (
    <ListItem
      button
      classes={active ? { root: props.classes.button } : {}}
      onClick={props.redirect}
    >
      {/* $FlowFixMe */}
      <ListItemText primary={props.name} />
    </ListItem>
  )
}

export default enhance(Link)
