//@flow
import React from "react"
import type { TodoType } from "./../../types/todo"
import styled from "styled-components"
import TextField from "material-ui/TextField"
import Checkbox from "material-ui/Checkbox"
import IconButton from "material-ui/IconButton"
import CloseIcon from "material-ui-icons/Close"

type Props = {
  todo: TodoType,
  onChange: (todo: TodoType) => void,
  remove: Function,
  index: number
}

const Todo = (props: Props) => {
  const handleChange = (
    type: "done" | "description",
    value: string | boolean
  ) => {
    if (type === "done" && typeof value === "boolean") {
      props.onChange({
        ...props.todo,
        done: value
      })
    } else if (type === "description" && typeof value === "string") {
      props.onChange({
        ...props.todo,
        description: value
      })
    }
  }
  return (
    <Container>
      {/* $FlowFixMe */}
      <Checkbox
        checked={props.todo.done}
        onChange={e => handleChange("done", e.target.checked)}
      />
      <TextField
        label={`Todo ${props.index + 1}`}
        fullWidth
        multiline
        value={props.todo.description}
        onChange={e => handleChange("description", e.target.value)}
      />
      {/* //$FlowFixMe */}
      <IconButton
        onClick={props.remove}
        aria-label="Close"
        style={{ color: "red" }}
      >
        <CloseIcon />
      </IconButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export default Todo
