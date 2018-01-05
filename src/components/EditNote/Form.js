//  @flow
import React, { Component } from "react"
import Button from "material-ui/Button"
import { Formik } from "formik"
import { CircularProgress } from "material-ui/Progress"
import { graphql, compose } from "react-apollo"
import _ from "lodash"
import {
  GET_NOTES,
  UPDATE_NOTE,
  CREATE_NOTE,
  GET_PROJECT
} from "./../../apollo/queries"
import styled from "styled-components"
import Editor from "../Markdown/Editor"
import FullScreenDialog from "./../FullScreenDialog/FullScreenDialog"


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
    if (this.props.id && this.props.data.loading) {
      // $FlowFixMe
      return <CircularProgress />
    }
    const note = this.getNote()
    return (
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
              <FullScreenDialog
                close={this.props.onRequestClose}
                actions={() => <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    const click = new MouseEvent("click")
                    this.submitInput.dispatchEvent(click)
                  }}
                >
                  save
                </Button>}
                title={(this.props.id ? "Edit" : "Add a") + " Note"}
              >
                <StyledForm onSubmit={handleSubmit}>
                  {/* $FlowFixMe */}
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
                          handleChange({ target: fake, persist: () => { } })
                        }}
                      />
                    </Description>
                  </Container>
                  <input
                    type="submit"
                    style={{ display: "none" }}
                    ref={input => (this.submitInput = input)}
                  />
                </StyledForm>
              </FullScreenDialog>
            )}
        />
    )
  }
}

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
`

const Description = styled.div`
  flex: 3 3 auto;
  padding: 15px;
`

const StyledForm = styled.form`
  display:flex;
  flex-flow: column nowrap;
  height: 100%;
`

export default enhance(EditNote)
