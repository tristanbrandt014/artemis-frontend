// @flow
import React from "react"
import { connect } from "react-redux"
import { Sidebar } from "./../../components"
import Drawer from 'material-ui/Drawer'
import { sidebar } from "../../styles";
import { toggleSidebar } from "./../../store/actions/sidebar";

const mapStateToProps = state => ({
  window: state.window,
  sidebar: state.sidebar
})

const mapDispatchToProps = dispatch => ({
  toggle: open => dispatch(toggleSidebar(open))
})

const withState = connect(mapStateToProps, mapDispatchToProps)

const enhance = withState

const SidebarContainer = props => (
  props.window.width <= sidebar.breakpoint ?
    <Drawer
      anchor="left"
      open={props.sidebar}
      onClick={() => props.toggle(false)}
      onClose={() => props.toggle(false)}
    >
      <Sidebar />
    </Drawer> :
    <Sidebar />
)

export default enhance(SidebarContainer)