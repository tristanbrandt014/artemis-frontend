//@flow
import React from "react"
import styled from "styled-components"
import type { TodoType } from "./../../types/todo"
import Todo from "./Todo"
import Button from "material-ui/Button"

type Props = {
  todos: [TodoType],
  update: (todos: [TodoType]) => void
}

const EditTodos = (props: Props) => {
  const edit = (key: number, todo: TodoType) => {
    const newTodos = [...props.todos]
    newTodos[key] = todo
    props.update(newTodos)
  }
  const add = () => {
    const newTodos = [...props.todos]
    newTodos.push({
      description: "",
      done: ""
    })
    props.update(newTodos)
  }
  const remove = (key: number) => {
    const newTodos = props.todos.filter((todo, index) => index !== key)
    props.update(newTodos)
  }
  return (
    <Container>
      {props.todos.map((todo, index) => (
        <Todo
          remove={() => remove(index)}
          onChange={todo => edit(index, todo)}
          key={index}
          todo={todo}
          index={index}
        />
      ))}
      {/* $FlowFixMe */}
      <Button style={{ marginTop: 20 }} onClick={add} raised>
        Add todo
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

export default EditTodos
