//  @flow
import React, { Component } from "react"
import Aux from "react-aux"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import { Formik } from "formik"
import { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog"
import { connect } from "react-redux"
import { toggleCreate } from "./../../store/actions/projects"
import { MenuItem } from "material-ui/Menu"
import { FormControl } from "material-ui/Form"
import Input, { InputLabel } from "material-ui/Input"
import { graphql, compose } from "react-apollo"
import {
  GET_CATEGORIES,
  CREATE_PROJECT,
  GET_PROJECTS
} from "./../../apollo/queries"
import Select from "material-ui/Select"
import styled from "styled-components"

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleCreate(open))
})

const withCategories = graphql(GET_CATEGORIES)

const withCreateProject = graphql(CREATE_PROJECT, {
  props: ({ mutate }) => ({
    create: (args: { name: string, category?: string }) =>
      mutate({
        variables: {
          name: args.name,
          ...(args.category ? { category: args.category } : {})
        }
      })
  }),
  // $FlowFixMe
  options: {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: {
          ids: null,
          category: null,
          archived: null
        }
      }
    ]
  }
})

const enhance = compose(
  connect(null, mapDispatchToProps),
  withCategories,
  withCreateProject
)

class AddProject extends Component<{}, {}> {
  validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = "Please enter a project name"
    }
    return errors
  }

  submitInput: any

  submit = async (values, { setSubmitting, setErrors }) => {
    try {
      this.props.toggleDialog(false)
      await this.props.create(values)
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      setErrors({ auth: "Failed to connect" })
    }
  }

  render() {
    return (
      <Aux>
        <Formik
          initialValues={{
            category: "",
            name: ""
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
              <DialogTitle>Add a project</DialogTitle>
              {/* $FlowFixMe */}
              <DialogContent>
                <Field>
                  <TextField
                    type="text"
                    name="name"
                    margin="normal"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    label="Name"
                    onChange={handleChange}
                    value={values.name}
                  />
                </Field>
                <Field>
                  {/* $FlowFixMe */}
                  <FormControl fullWidth>
                    {/* $FlowFixMe */}
                    <InputLabel htmlFor="category-input">Category</InputLabel>
                    {/* $FlowFixMe */}
                    <Select
                      value={values.category}
                      onChange={e => {
                        const fake = {
                          name: "category",
                          value: e.target.value
                        }
                        handleChange({ target: fake, persist: () => {} })
                      }}
                      input={
                        <Input
                          value={values.category}
                          onChange={() => {}}
                          id="category-input"
                        />
                      }
                    >
                      {/* $FlowFixMe */}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {!this.props.data.loading &&
                        this.props.data.Categories.map(category => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Field>
              </DialogContent>
              {/* $FlowFixMe */}
              <DialogActions>
                {/* $FlowFixMe */}
                <Button onClick={() => this.props.toggleDialog(false)}>
                  Cancel
                </Button>
                {/* $FlowFixMe */}
                <Button
                  onClick={() => {
                    const click = new MouseEvent("click")
                    this.submitInput.dispatchEvent(click)
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
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

const Field = styled.div`padding-bottom: 10px;`

export default enhance(AddProject)
