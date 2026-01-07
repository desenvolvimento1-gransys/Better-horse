const SET_CEP = (state, obj) => {
    state.cep = obj
}

const SET_CONSULT = (state, obj) => {
    state.consult = obj
}

const SET_SPINNER = (state, obj) => {
    state.spinner = obj
}

const SET_CONSULTSPINNER = (state, obj) => {
    state.spinner = obj
}

const SET_DELIVERYTYPE = (state, obj) => {
    state.deliveryType = obj
}


export default {
    SET_CEP,
    SET_CONSULT,
    SET_CONSULTSPINNER,
    SET_DELIVERYTYPE,
    SET_SPINNER
}