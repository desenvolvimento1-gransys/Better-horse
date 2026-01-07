const SET_FORMDATA = (state, obj) => {
    state.formData = obj
}

const SET_FORMERRORS = (state, obj) => {
    state.formErrors = obj
}

const SET_USER = (state, obj) => {
    state.user = obj
}

const SET_LOGINERRORS = (state, obj) => {
    state.loginErrors = obj
}

const SET_STARTAPPP = (state, obj) => {
    state.startApp = obj
}

const SET_ACCOUNTLOSTERRORS = (state, obj) => {
    state.errorsAccountLost = obj
}

const SET_RESETPASSWORDERRORS = (state, obj) => {
    state.resetPasswordErrors = obj
}

export default {
    SET_FORMDATA,
    SET_FORMERRORS,
    SET_USER,
    SET_LOGINERRORS,
    SET_STARTAPPP,
    SET_ACCOUNTLOSTERRORS,
    SET_RESETPASSWORDERRORS
}