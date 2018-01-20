// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Paper, Typography, TextField, Button } from "material-ui"
import { cyan, red } from "material-ui/colors"
import { Formik } from "formik"
import rp from "request-promise"
import { LinearProgress } from "material-ui/Progress"
import logo from "./../../resources/img/arte.png"
import config from "./../../config"
import { loginAction } from "./../../store/actions/auth"
import { push } from "react-router-redux"
import {get} from "lodash"

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  login: (token, user) => dispatch(loginAction(token, user)),
  redirect: path => dispatch(push(path))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

type Props = {
  login: (token: string, user: Object) => void,
  redirect: (path: string) => void,
  auth?: Object
}

class Login extends Component<Props, {}> {
  componentWillMount() {
    this.checkUser(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.checkUser(newProps)
  }

  checkUser(props) {
    if (props.auth && props.auth.token) {
      const startup = get(props.auth, "user.startup", {})
      // console.log("STARTUP", startup)
      if (startup.type === "category" && startup.value) {
        props.redirect(`/app/projects/category/${startup.value}`)
      } else {
        props.redirect("/app")
      }
    }
  }

  attemptLogin(email: string, password: string): Promise<Object> {
    const options = {
      method: "POST",
      uri: `${config.api}/login`,
      body: {
        email,
        password
      },
      json: true
    }
    return rp(options)
  }

  validate(values: { email: string, password: string }) {
    let errors = {}
    if (!values.email) {
      errors.email = "Please enter an email address"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address"
    }

    if (!values.password) {
      errors.password = "Please enter your password"
    }
    return errors
  }

  submit: any

  render() {
    return (
      <Wrapper>
        <BackgroundTop />
        <Container>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validate={values => this.validate(values)}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              try {
                const result = await this.attemptLogin(
                  values.email,
                  values.password
                )
                setSubmitting(false)
                this.props.login(result.token, result.user)
              } catch (err) {
                setSubmitting(false)
                if (err.statusCode === 403) {
                  setErrors({ auth: "Invalid credentials" })
                } else {
                  setErrors({ auth: "Failed to connect" })
                }
              }
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
                <FormContainer>
                  {/* $FlowFixMe */}
                  {isSubmitting && <Progress mode="query" />}
                  <FormInner>
                    <Content>
                      <Header>
                        <Logo src={logo} alt="Logo" />
                        {<Heading type="headline">Artemis</Heading>}
                      </Header>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          type="email"
                          name="email"
                          margin="normal"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email}
                          label="Email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        <TextField
                          name="password"
                          error={!!errors.password}
                          helperText={errors.password}
                          type="password"
                          margin="normal"
                          fullWidth
                          label="Password"
                          onChange={handleChange}
                          value={values.password}
                        />
                        {errors.auth && (
                          <Error>
                            {/* $FlowFixMe */}
                            <Typography>{errors.auth}</Typography>
                          </Error>
                        )}
                        <input
                          type="submit"
                          style={{ display: "none" }}
                          ref={input => (this.submit = input)}
                        />
                      </form>
                    </Content>
                    <Actions>
                      {/* $FlowFixMe */}
                      <Button onClick={() => this.props.redirect("/register")}>Register</Button>
                      {/* $FlowFixMe */}
                      <Button
                        style={{ color: "white", marginLeft: "10px" }}
                        raised
                        color="primary"
                        onClick={() => {
                          const click = new MouseEvent("click")
                          this.submit.dispatchEvent(click)
                        }}
                      >
                        Log in
                    </Button>
                    </Actions>
                  </FormInner>
                </FormContainer>
              )}
          />
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 100%;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1 1 100%;
  flex-flow:column nowrap;
`

const Header = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const FormContainer = styled(Paper) `
  z-index: 2;
  flex: 1 1 100%;
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  @media(min-width: 400px) {
    height: 450px;
    flex: initial;
    width: 350px;
  }
`
const FormInner = styled.div`
  padding: 26px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 1 1 auto;
`

const Content = styled.div`
`

const BackgroundTop = styled.div`
  position: absolute;
  width: 100%;
  height: 50vh;
  background-color: ${cyan[500]};
`

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px;
`

const Actions = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
`

const Error = styled.div`
  padding: 10px;
  background-color: ${red[50]};
`
const Heading = styled(Typography) `margin-left: 15px;`

const Progress = styled(LinearProgress)`
  flex: 0 0 auto;
`

export default enhance(Login)
