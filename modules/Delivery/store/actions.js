import { baseApiUrl, catchError, storeId, itensPerPage } from "@/Settings/global";
import axios from "axios";

// let defaultPath = '/ecommerce/search/'

const checkDelivery = function ({ commit, state }, value) {

    let cep = value.replace(/\.|\-/g, "");
    if (cep.length == 8) {
        commit('SET_CEP', cep)
        if ($nuxt.$store.state.Layouts.config.apiVersion && $nuxt.$store.state.Layouts.config.apiVersion.deliveryCheck) {
            switch ($nuxt.$store.state.Layouts.config.apiVersion.deliveryCheck) {
                case 'V1':
                    return calculateDelivery_V1({ commit, state });
                case 'V2':
                    return calculateDelivery_V2({ commit, state });
                default:
                    return calculateDelivery_V1({ commit, state });
            }
        } else {
            calculateDelivery_V1({ commit, state });
        }
    }
}

const setDeliveryType = function ({ commit }, value) {
    commit('SET_DELIVERYTYPE', value)
}

const calculateDelivery_V1 = function ({ commit, state }) {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.startModalSpinner()

    })
    commit('SET_SPINNER', true)
    let cartStorageData = null
    let json = localStorage.getItem("cart")
    cartStorageData = JSON.parse(json);
    let data = {
        grids: {
            ...cartStorageData,
        },
        cep: state.cep
    }

    axios.post(`${baseApiUrl}/ecommerce/delivery/check`, data)

        .then(res => {
            if (res.data.status == 201) {
                commit('SET_CONSULT', res.data.data)
            }
            if ($nuxt.$store.state.Layouts.config.pixel) {
                fbq("track", "checkDelivery", { cep: data.cep, cartData: { ...$nuxt.$store.state.Cart.cartData }, delivery: res.data.data });
            }
        })
        .catch(e => {
            if (e.response.status == 422) {
                commit('SET_ERRORS', e.response.data.errors)
            } else {
                // catchError(e.status)
            }
        })
        .finally(() => {
            commit('SET_SPINNER', false)
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finishModalSpinner()

            })
        });


}

const calculateDelivery_V2 = function ({ commit, state }) {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.startModalSpinner()

    })
    commit('SET_SPINNER', true)
    let cartStorageData = null
    let json = localStorage.getItem("cart")
    cartStorageData = JSON.parse(json);
    let data = {
        grids: {
            ...cartStorageData,
        },
        cep: state.cep
    }

    axios.post(`${baseApiUrl}/v2/ecommerce/delivery/check`, data)

        .then(res => {
            if (res.data.status == 201) {
                commit('SET_CONSULT', res.data.data)
            }
            if ($nuxt.$store.state.Layouts.config.pixel) {
                fbq("track", "checkDelivery", { cep: data.cep, cartData: { ...$nuxt.$store.state.Cart.cartData }, delivery: res.data.data });
            }
        })
        .catch(e => {
            if (e.response.status == 422) {
                commit('SET_ERRORS', e.response.data.errors)
            } else {
                // catchError(e.status)
            }
        })
        .finally(() => {
            commit('SET_SPINNER', false)
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finishModalSpinner()

            })
        });


}

const cleanDeliveryState = function ({ commit }) {
    commit('SET_DELIVERYTYPE', null)
}

export default {
    checkDelivery,
    setDeliveryType,
    cleanDeliveryState
}