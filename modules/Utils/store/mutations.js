const SET_MODALSPINNER = (state, obj) => {
    state.modalSpinner = obj
}

const SET_SPINNER = (state, obj) => {
    state.spinner = obj
}

const SET_EXITDIALOG = (state, obj) => {
    state.exitDialog = obj
}


export default {
    SET_MODALSPINNER,
    SET_SPINNER,
    SET_EXITDIALOG
}