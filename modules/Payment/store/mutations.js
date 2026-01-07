import state from "./state"

const SET_SELECTEDINSTALLMENT = (state, obj) => {
    state.selectedInstallment = obj
}

const SET_BUYVALUE = (state, obj) => {
    state.buyValue = obj
}

const SET_DIALOG = (state, obj) => {
    state.paymentDialogState = obj
}

const SET_PAYMENTSPINNER = (state, obj) => {
    state.paymentSpinner = obj
}

const SET_STATUSPAYMENT = (state, obj) => {
    state.statusPaymentResponse = obj
}

const SET_ERRORS = (state, obj) => {
    state.errors = obj
}

const SET_SENDTYPE = (state, obj) => {
    state.sendType = obj
}

const SET_COUPONERRORS = (state, obj) => {
    state.couponError = obj
}

const SET_PAYMENTSLIPCODE = (state, obj) => {
    state.pixQrCode = obj
}

const SET_DISCOUNTCOUPON = (state, obj) => {
    state.discountCoupon = obj
}

const SET_PAYMENTINFORMATION = (state, obj) => {
    state.paymentInformation = obj
}

const SET_PAYMENTMETHOD = (state, obj) => {
    state.paymentMethod = obj
}


export default {
    SET_SELECTEDINSTALLMENT,
    SET_SENDTYPE,
    SET_STATUSPAYMENT,
    SET_BUYVALUE,
    SET_DIALOG,
    SET_PAYMENTSPINNER,
    SET_ERRORS,
    SET_COUPONERRORS,
    SET_DISCOUNTCOUPON,
    SET_PAYMENTINFORMATION,
    SET_PAYMENTMETHOD,
    SET_PAYMENTSLIPCODE
}