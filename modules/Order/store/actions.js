import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from "axios";

// let defaultPath = '/buy/'

const setCloseOrderModal = function ({ commit, state }, value) {
  commit('SET_CLOSEORDERMODAL', value)
  if (value == true && $nuxt.$store.state.Addressess.list.length > 0) {
    let arrayNum = $nuxt.$store.state.Addressess.list.length - 1;
    let cep = $nuxt.$store.state.Addressess.list[arrayNum].cep;
    $nuxt.$store.dispatch("Delivery/checkDelivery", cep);
    commit('SET_SENDADDRESSID', $nuxt.$store.state.Addressess.list[arrayNum].id)
  }
}

const setAddressId = function ({ commit }, value) {
  commit('SET_SENDADDRESSID', value)
}

const setOrderResume = function ({ commit }, payload) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })
  axios.post(`${baseApiUrl}/order/resume`, { buy_id: payload.buy_id })
    .then(res => {
      console.log(res.data);
      commit('SET_RESUMELIST', res.data)
      $nuxt.$store.dispatch("Payment/setBuyValue", (parseFloat(res.data[0].products_value) + parseFloat(res.data[0].delivery_price)));
    })
    .catch(e => {
      catchError(e)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish()
      })
    });
}

const setOrderHistoric = function ({ commit }) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })
  axios.post(`${baseApiUrl}/buy/show`, { company_id: storeId })
    .then(res => {
      commit('SET_ORDERHISTORIC', res.data)
    })
    .catch(e => {
      catchError(e)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish()
      })
    });
}

const setOrderDetails = function ({ commit }, payload) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })
  axios.post(`${baseApiUrl}/buy/show-details`, { company_id: storeId, id: payload.orderId })
    .then(res => {
      commit('SET_ORDERDETAILS', res.data)
    })
    .catch(e => {
      catchError(e)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish()
      })
    });
}

const cleanOrderResume = function ({ commit }) {
  commit('SET_RESUMELIST', [])
}

export default {
  setCloseOrderModal,
  setAddressId,
  setOrderResume,
  cleanOrderResume,
  setOrderHistoric,
  setOrderDetails
}