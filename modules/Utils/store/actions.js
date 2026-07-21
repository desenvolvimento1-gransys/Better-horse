const setModalSpinner = function ({ commit }, value) {
    commit('SET_MODALSPINNER', value)
}

const setSpinner = function ({ commit }, value) {
    commit('SET_SPINNER', value)
}

const setExitDialog = function ({ commit }, value) {
    commit('SET_EXITDIALOG', value)
}

const whenAppInit = function () {
    $nuxt.$store.dispatch("User/checkLoged");
    $nuxt.$store.dispatch("Cart/showCartItems", "empty");
    $nuxt.$store.dispatch("Layouts/fetchLayout");
}

export default {
    setModalSpinner,
    setSpinner,
    setExitDialog,
    whenAppInit
}