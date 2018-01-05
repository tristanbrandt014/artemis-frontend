//  @flow
import React, { Component } from "react"
import Button from "material-ui/Button"
import { Formik } from "formik"
import { CircularProgress } from "material-ui/Progress"
import { graphql, compose } from "react-apollo"
import _ from "lodash"
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY
} from "./../../apollo/queries"
import styled from "styled-components"
import { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog"
import TextField from "material-ui/TextField"
import { SliderPicker } from "react-color"
import Typography from "material-ui/Typography/Typography";

type Props = {
  close: Function
}

const withCategory = graphql(GET_CATEGORIES, {
  options: props => ({
    variables: {
      id: props.id
    }
  })
})

const withUpdate = graphql(UPDATE_CATEGORY, {
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

const withCreate = graphql(CREATE_CATEGORY, {
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
    update: (proxy, { data: { createCategory } }) => {
      const data = proxy.readQuery({
        query: GET_CATEGORIES,
        variables: {
          id: null
        }
      })
      data.Categories.push(createCategory)
      proxy.writeQuery({
        query: GET_CATEGORIES,
        variables: {
          id: null
        },
        data
      })
    }
  })
})

const enhance = compose(withCategory, withCreate, withUpdate)

class EditCategory extends Component<Props, {}> {
  validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = "Enter a name"
    }
    if (!values.color) {
      errors.color = "Select a color"
    }
    return errors
  }

  getCategory() {
    if (!this.props.id || this.props.data.loading) {
      return false
    }
    return _.get(this.props.data, "Categories[0]", false)
  }

  submitInput: any

  submit = async (values, { setSubmitting, setErrors }) => {
    try {
      this.props.close()
      if (this.props.id) {
        await this.props.update({
          ...values,
        })
      } else {
        await this.props.create({
          ...values
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
    const category = this.getCategory()

    return (
      <Formik
        initialValues={{
          name: category ? category.name : "",
          color: category ? category.color : "#999"
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
              <DialogTitle>{(this.props.id ? "Edit" : "Add a") + " Category"}</DialogTitle>
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
                <Typography style={{marginBottom:10}}>Color:</Typography>
                <SliderPicker color={values.color} onChangeComplete={(color, event) => {
                  const fake = {
                    name: "color",
                    value: color.hex
                  }
                  handleChange({ target: fake, persist: () => { } })

                }} />
              </DialogContent>
              {/* $FlowFixMe */}
              <DialogActions>
                {/* $FlowFixMe */}
                <Button onClick={this.props.close}>
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
    )
  }
}

const Field = styled.div`padding-bottom: 10px;`

export default enhance(EditCategory)