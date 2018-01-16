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
import { get } from "lodash"
import Recaptcha from "react-google-recaptcha"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

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

type State = {
  captchaDialog: boolean
}

class Register extends Component<Props, State> {
  state = {
    captchaDialog: false
  }

  componentWillMount() {
    this.checkUser(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.checkUser(newProps)
  }

  checkUser(props) {
    if (props.auth && props.auth.token) {
      const startup = get(props.auth, "user.startup", {})
      console.log("STARTUP", startup)
      if (startup.type === "category" && startup.value) {
        props.redirect(`/app/projects/category/${startup.value}`)
      } else {
        props.redirect("/app")
      }
    }
  }

  attemptRegister(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    captcha: string
  ): Promise<Object> {
    const options = {
      method: "POST",
      uri: `${config.api}/register`,
      body: {
        email,
        password,
        firstname,
        lastname,
        captcha
      },
      json: true
    }
    return rp(options)
  }

  validate(values: {
    email: string,
    password: string,
    passwordRepeat: string,
    firstname: string,
    lastname: string,
    captcha: string
  }) {
    let errors = {}

    console.log(values)

    if (!values.firstname) {
      errors.firstname = "Please enter your first name"
    }

    if (!values.lastname) {
      errors.lastname = "Please enter your last name"
    }

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

    if (values.password !== values.passwordRepeat) {
      errors.passwordRepeat = "Passwords do not match"
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
              password: "",
              passwordRepeat: "",
              firstname: "",
              lastname: "",
              captcha: ""
            }}
            validate={values => this.validate(values)}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              console.log(values)
              if (!values.captcha) {
                this.setState({ captchaDialog: true })
                setSubmitting(false)
                return
              }
              try {
                const result = await this.attemptRegister(
                  values.firstname,
                  values.lastname,
                  values.email,
                  values.password,
                  values.captcha
                )
                setSubmitting(false)
                this.props.login(result.token, result.user)
              } catch (err) {
                setSubmitting(false)
                console.dir(err)
                setErrors({ auth: "Failed to connect" })
              }
            }}
            validateOnChange={false}
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
                          type="text"
                          name="firstname"
                          margin="normal"
                          fullWidth
                          error={!!errors.firstname}
                          helperText={errors.firstname}
                          label="First name"
                          onChange={handleChange}
                          value={values.firstname}
                        />
                        <TextField
                          type="text"
                          name="lastname"
                          margin="normal"
                          fullWidth
                          error={!!errors.lastname}
                          helperText={errors.lastname}
                          label="Last name"
                          onChange={handleChange}
                          value={values.lastname}
                        />
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
                        <TextField
                          name="passwordRepeat"
                          error={!!errors.passwordRepeat}
                          helperText={errors.passwordRepeat}
                          type="password"
                          margin="normal"
                          fullWidth
                          label="Retype Password"
                          onChange={handleChange}
                          value={values.passwordRepeat}
                        />
                        <Captcha>
                          <Recaptcha
                            onChange={response => {
                              const fake = {
                                name: "captcha",
                                value: response
                              }
                              console.log("HERE", response)
                              handleChange({ target: fake, persist: () => { } })
                            }}
                            sitekey={config.siteKey}
                          />
                        </Captcha>
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
                      <Button onClick={() => this.props.redirect("/login")}>Login</Button>
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
                        Register
                    </Button>
                    </Actions>
                  </FormInner>
                </FormContainer>
              )}
          />
        </Container>
        <Dialog
          open={this.state.captchaDialog}
          onClose={() => this.setState({ captchaDialog: false })}
        >
          <DialogTitle id="alert-dialog-title">Please complete the captcha</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Unless you're a robot. Then, well... do what robots do when they encounter captcha's
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ captchaDialog: false })} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
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
  margin-top: 10px;
  padding: 10px;
  background-color: ${red[50]};
`
const Heading = styled(Typography) `margin-left: 15px;`

const Progress = styled(LinearProgress) `
  flex: 0 0 auto;
`

const Captcha = styled.div`
  margin-top: 20px;
`

export default enhance(Register)
