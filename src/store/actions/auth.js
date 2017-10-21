// @flow

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const loginAction = (token: string, user: Object) => ({
    type: LOGIN,
    payload: {
        token,
        user
    }
})

const logoutAction = () => ({
    type: LOGOUT
})

export {
    LOGIN,
    LOGOUT,
    loginAction,
    logoutAction
}