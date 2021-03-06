//  @flow
import React, { Component } from "react"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import { Formik } from "formik"
import { CircularProgress } from "material-ui/Progress"
import { connect } from "react-redux"
import { MenuItem } from "material-ui/Menu"
import { FormControl } from "material-ui/Form"
import Input, { InputLabel } from "material-ui/Input"
import { graphql, compose } from "react-apollo"
import {
  GET_CATEGORIES,
  GET_PROJECTS,
  UPDATE_PROJECT,
  GET_USER,
  GET_USER_DATA
} from "./../../apollo/queries"
import { toggleUpdate } from "./../../store/actions/projects"
import Select from "material-ui/Select"
import styled from "styled-components"
import {capitalize} from "lodash"
import Editor from "../Markdown/Editor"
import FullScreenDialog from "./../FullScreenDialog/FullScreenDialog"
import { breakpoints } from "./../../styles"

const mapDispatchToProps = dispatch => ({
  toggleDialog: open => dispatch(toggleUpdate(open))
})

const mapStateToProps = state => ({
  window: state.window
})

const withState = connect(mapStateToProps, mapDispatchToProps)

const withProject = graphql(GET_PROJECTS, {
  options: props => ({
    variables: {
      ids: [props.id]
    }
  }),
  name: "project"
})

const withCategories = graphql(GET_CATEGORIES, {
  name: "categories",
  options: {
    variables: {
      id: null
    }
  }
})

const withUpdate = graphql(UPDATE_PROJECT, {
  props: ({ ownProps, mutate }) => ({
    update: params =>
      mutate({
        variables: {
          id: ownProps.id,
          ...params
        }
      })
  }),
  options: {
    refetchQueries: [
      {
        query: GET_USER
      },
      {
        query: GET_USER_DATA
      }
    ]
  }
})

const enhance = compose(withState, withCategories, withUpdate, withProject)

class EditProject extends Component<{}, {}> {
  validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = "Please enter a project name"
    }
    return errors
  }

  statuses = ["ACTIVE", "TODO", "COMPLETE", "ABANDONED", "NONE"]

  submitInput: any

  submit = async (values, { setSubmitting, setErrors }) => {
    try {
      this.props.toggleDialog(false)
      // console.log(this.props.id)
      await this.props.update(values)
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      // console.log("FAILED")
    }
  }
  render() {
    if (this.props.project.loading || this.props.categories.loading) {
      // $FlowFixMe
      return (
        <ProgressContainer>
          <CircularProgress />
        </ProgressContainer>
      )
    }
    const project = this.props.project.Projects[0]
    const category = project.category
    return (
      <Formik
        initialValues={{
          category: category ? category.id : "",
          summary: project.summary || "",
          name: project.name || "",
          status: project.status || "NONE",
          description: project.description || ""
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
            close={() => this.props.toggleDialog(false)}
            actions={() => (
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  const click = new MouseEvent("click")
                  this.submitInput.dispatchEvent(click)
                }}
              >
                save
              </Button>
            )}
            title="Edit Project"
          >
            <StyledForm onSubmit={handleSubmit}>
              {/* $FlowFixMe */}
              <Container>
                <Details>
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
                      autoFocus
                    />
                  </Field>
                  <Field>
                    <TextField
                      type="text"
                      multiline
                      name="summary"
                      margin="normal"
                      fullWidth
                      error={!!errors.summary}
                      helperText={errors.summary}
                      label="Summary"
                      onChange={handleChange}
                      value={values.summary}
                    />
                  </Field>
                  {!this.props.categories.loading &&
                  this.props.categories.Categories.length ? (
                    <Field withMargin>
                      {/* $FlowFixMe */}
                      <FormControl fullWidth>
                        {/* $FlowFixMe */}
                        <InputLabel htmlFor="category-input">
                          Category
                        </InputLabel>
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
                          {this.props.categories.Categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Field>
                  ) : (
                    <span />
                  )}
                  <Field withMargin>
                    {/* $FlowFixMe */}
                    <FormControl fullWidth>
                      {/* $FlowFixMe */}
                      <InputLabel htmlFor="status-input">Status</InputLabel>
                      {/* $FlowFixMe */}
                      <Select
                        value={values.status}
                        onChange={e => {
                          const fake = {
                            name: "status",
                            value: e.target.value
                          }
                          handleChange({ target: fake, persist: () => {} })
                        }}
                        input={
                          <Input
                            value={values.status}
                            onChange={() => {}}
                            id="status-input"
                          />
                        }
                      >
                        {this.statuses.map(status => (
                          //$FlowFixMe
                          <MenuItem value={status} key={status}>
                            <em>{capitalize(status)}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Field>
                  <input
                    type="submit"
                    style={{ display: "none" }}
                    ref={input => (this.submitInput = input)}
                  />
                </Details>
                <Description>
                  <Editor
                    value={values.description}
                    name="Description"
                    description="Describe your project"
                    minHeight={400}
                    onChange={value => {
                      const fake = {
                        name: "description",
                        value: value
                      }
                      handleChange({ target: fake, persist: () => {} })
                    }}
                  />
                </Description>
              </Container>
            </StyledForm>
          </FullScreenDialog>
        )}
      />
    )
  }
}

const Field = styled.div`
  padding-bottom: 10px;
  margin-top: ${props => (props.withMargin ? "28px" : "0")};
`

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-flow: column nowrap;
  @media (min-width: ${breakpoints.tablet + 1}px) {
    flex-flow: row nowrap;
  }
`

const Details = styled.div`
  flex: 0 0 25%;
  padding: 15px;
`

const Description = styled.div`
  flex: 1 1 auto;
  padding: 15px;
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

const ProgressContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`

export default enhance(EditProject)
