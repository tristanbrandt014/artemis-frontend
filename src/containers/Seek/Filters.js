// @flow
import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { updateFilter } from "./../../store/actions/filters"
import { FormControl } from "material-ui/Form"
import Input, { InputLabel } from "material-ui/Input"
import Select from "material-ui/Select"
import { MenuItem } from "material-ui/Menu"
import {
  ARCHIVED,
  UNARCHIVED,
  ALL,
  ACTIVE,
  TODO,
  COMPLETE,
  ABANDONED,
  NONE
} from "./../../utils/filters"
import { upperFirst } from "lodash"

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  update: (key, value) => dispatch(updateFilter(key, value))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

const Filters = props => (
  <Container>
    {Object.keys(props.filters).map(key => {
      const values = []
      if (key === "archived") {
        [ALL, ARCHIVED, UNARCHIVED].forEach(value => values.push(value))
      } else if (key === "status") {
        [ALL, ACTIVE, TODO, COMPLETE, ABANDONED, NONE].forEach(value => values.push(value))
      } else {
        return null
      }
      return (
        <Filter key={key}>
          <InputLabel htmlFor={key}>{upperFirst(key)}</InputLabel>
          <Select
            value={props.filters[key]}
            onChange={e => props.update(key, e.target.value)}
            input={<Input name={key} id={key} />}
          >
            {values.map(filter => (
              <MenuItem key={filter} value={filter}>{upperFirst(filter)}</MenuItem>
            ))}
          </Select>
        </Filter>
      )
    })}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Filter = styled(FormControl)`
  margin-bottom: 30px !important;
`

export default enhance(Filters)
