// `scope` e 'product' ou 'cart'. Os dois contextos cotam de forma independente:
// o cliente pode estar vendo um produto e ter outro carrinho montado.

const SET_CEP = (state, { scope, value }) => {
    state[scope].cep = value
}

const SET_QUOTE = (state, { scope, value }) => {
    state[scope].quote = value
    state[scope].services = (value && value.services) || []
}

const SET_SPINNER = (state, { scope, value }) => {
    state[scope].spinner = value
}

const SET_ERROR = (state, { scope, value }) => {
    state[scope].error = value
}

const SET_SELECTED_SERVICE = (state, value) => {
    state.cart.selectedServiceId = value
}

const RESET = (state, scope) => {
    state[scope].quote = null
    state[scope].services = []
    state[scope].error = null
    if (scope === 'cart') {
        state.cart.selectedServiceId = null
    }
}

export default {
    SET_CEP,
    SET_QUOTE,
    SET_SPINNER,
    SET_ERROR,
    SET_SELECTED_SERVICE,
    RESET,
}
