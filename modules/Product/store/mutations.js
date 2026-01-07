const SET_PRODUCT = (state, obj) => {
    state.product = obj
}

const SET_SELECTEDIMG = (state, obj) => {
    state.selectedImg = obj
}

const SET_LOAD = (state, obj) => {
    state.load = obj
}

const SET_SELECTEDCOLOR = (state, obj) => {
    state.selectedColor = obj
}

const SET_SELECTEDSIZE = (state, obj) => {
    state.selectedSize = obj
}

const SET_ATRIBUTES = (state, obj) => {
    state.atributes = obj
}

const SET_DELIVERY_CONSULT = (state, obj) => {
    state.deliveryConsult = obj
}

const SET_DELIVERY_SPINNER = (state, obj) => {
    state.deliverySpinner = obj
}

const SET_WARNME_TOAST_MESSAGE = (state, obj) => {
    state.warnMeToastMessage = obj
}

export default {
    SET_PRODUCT,
    SET_SELECTEDIMG,
    SET_LOAD,
    SET_SELECTEDCOLOR,
    SET_SELECTEDSIZE,
    SET_ATRIBUTES,
    SET_DELIVERY_CONSULT,
    SET_DELIVERY_SPINNER,
    SET_WARNME_TOAST_MESSAGE
}