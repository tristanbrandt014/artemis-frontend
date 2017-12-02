//  @flow
import React, { Component } from "react"
import Aux from "react-aux"
import Button from "material-ui/Button"
import { Formik } from "formik"
import { CircularProgress } from "material-ui/Progress"
import { graphql, compose } from "react-apollo"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import CloseIcon from "material-ui-icons/Close"
import _ from "lodash"
import {
  GET_NOTES,
  UPDATE_NOTE,
  CREATE_NOTE,
  GET_PROJECT
} from "./../../apollo/queries"
import styled from "styled-components"
import Editor from "../Markdown/Editor"


const withNote = graphql(GET_NOTES, {
  options: props => ({
    variables: {
      ids: props.id ? [props.id] : []
    }
  })
})

const withUpdate = graphql(UPDATE_NOTE, {
  props: ({ ownProps, mutate }) => ({
    update: params =>
      mutate({
        variables: {
          id: ownProps.id,
          ...params
        }
      })
  })
})

const withCreate = graphql(CREATE_NOTE, {
  props: ({ ownProps, mutate }) => ({
    create: params =>
      mutate({
        variables: {
          ...params
        }
      })
  }),
  // $FlowFixMe
  options: props => ({
    update: (proxy, { data: { createNote } }) => {
      const data = proxy.readQuery({
        query: GET_PROJECT,
        variables: {
          id: props.project_id
        }
      })
      data.Projects[0].notes.push(createNote)
      proxy.writeQuery({
        query: GET_PROJECT,
        variables: {
          id: props.project_id
        },
        data
      })
    }
  })
})

const enhance = compose(
  withNote,
  withUpdate,
  withCreate
)

class EditNote extends Component<{}, {}> {
  validate = values => {
    const errors = {}
    if (!values.body) {
      errors.todos = "Enter a note, todos, or both"
    }
    return errors
  }

  getNote() {
    if (!this.props.id || this.props.data.loading) {
      return false
    }
    return _.get(this.props.data, "Notes[0]", false)
  }

  submitInput: any

  submit = async (values, { setSubmitting, setErrors }) => {
    try {
      this.props.onRequestClose()
      if (this.props.id) {
        await this.props.update({
          ...values,
        })
      } else {
        await this.props.create({
          ...values,
          project_id: this.props.project_id
        })
      }
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      console.dir(err)
    }
  }
  render() {
    console.log(this.props)
    if (this.props.id && this.props.data.loading) {
      // $FlowFixMe
      return <CircularProgress />
    }
    const note = this.getNote()
    console.log(note)
    return (
      <Aux>
        <Formik
          initialValues={{
            body: note ? note.body : "",
            todos: note ? note.todos : []
          }}
          validate={this.validate}
          onSubmit={this.submit}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              {/* $FlowFixMe */}
              <AppBar>
                <ToolbarFlex>
                  <ToolbarLeft>
                    <IconButton
                      style={{ color: "white" }}
                      onClick={this.props.onRequestClose}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      style={{ color: "white" }}
                      type="title"
                      color="inherit"
                    >
                      {this.props.id ? "Edit" : "Add a"} Note
                    </Typography>
                  </ToolbarLeft>
                  <Button
                    style={{ color: "white" }}
                    onClick={() => {
                      const click = new MouseEvent("click")
                      this.submitInput.dispatchEvent(click)
                    }}
                  >
                    save
                  </Button>
                </ToolbarFlex>
              </AppBar>
              <Container>
                <Description>
                  <Editor
                    value={values.body}
                    name="Note"
                    description="Let your thoughts be recorded"
                    onChange={value => {
                      const fake = {
                        name: "body",
                        value: value
                      }
                      handleChange({ target: fake, persist: () => {} })
                    }}
                  />
                </Description>
              </Container>
              <input
                type="submit"
                style={{ display: "none" }}
                ref={input => (this.submitInput = input)}
              />
            </form>
          )}
        />
      </Aux>
    )
  }
}

const ToolbarFlex = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
`

const Container = styled.div`
  display: flex;
`

const Description = styled.div`
  flex: 3 3 auto;
  padding: 15px;
`

export default enhance(EditNote)