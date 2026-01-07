const SET_CLOSEORDERMODAL = (state, obj) => {
    state.closeOrderModal = obj
}

const SET_ORDERID = (state, obj) => {
    state.orderId = obj
}

const SET_SENDADDRESSID = (state, obj) => {
    state.sendAddressId = obj
}

const SET_RESUMELIST = (state, obj) => {
    state.resumeList = obj
}

const SET_ORDERHISTORIC = (state, obj) => {
    state.orderHistoric = obj
}

const SET_ORDERDETAILS = (state, obj) => {
    state.orderDetails = obj
}

export default {
    SET_CLOSEORDERMODAL,
    SET_ORDERID,
    SET_SENDADDRESSID,
    SET_RESUMELIST,
    SET_ORDERHISTORIC,
    SET_ORDERDETAILS
}