import axios from 'axios'
import { baseApiUrl, catchError, storeId } from "@/Settings/global";

let defaultPath = '/ecommerce/payment/'

const addDiscountToBuy = function ({ commit, state }, payload) {
  // console.log(state.discountCoupon.toUpperCase())

  $nuxt.$nextTick(() => {
    $nuxt.$loading.start();
  });
  commit('SET_COUPONERRORS', null)
  let data = {
    company_id: storeId,
    buy_id: $nuxt.$route.params.orderId,
    code: state.discountCoupon.toUpperCase()
  }

  axios.post(`${baseApiUrl + defaultPath}add-coupon`, data)
    .then(res => {
      if (res.data.status == 201) {
        checkTotalBuyValue({ commit }, { buy_id: $nuxt.$route.params.orderId })
        commit('SET_DISCOUNTCOUPON', null)
        $nuxt.$store.dispatch("Order/setOrderResume", { buy_id: $nuxt.$route.params.orderId });
      }
      if (res.data.status == 401) {
        checkTotalBuyValue({ commit }, { buy_id: $nuxt.$route.params.orderId })
        commit('SET_COUPONERRORS', res.data.message)
        $nuxt.$store.dispatch("Order/setOrderResume", { buy_id: $nuxt.$route.params.orderId });
      }
    })
    .catch(e => {
      // catchError(e.status)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const pixPayment = function ({ commit }, payload) {
  // commit('SET_PAYMENTSPINNER', true)
  // commit('SET_DIALOG', true)
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start();
  });
  let data = {
    company_id: storeId,
    ...payload
  }

  axios.post(`${baseApiUrl + defaultPath}pix-payment`, data)
    .then(res => {
      if (res.data.status == 401) {
        alert(res.data.message)
        $nuxt.$router.push({ path: `/` })
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 100) {
        commit('SET_STATUSPAYMENT', 100)

      }
      if (res.data.status == 7) {
        commit('SET_STATUSPAYMENT', 7)
      }
      if (res.data.status == 199) {
        alert('1 ou mais produtos da sua compra esgotaram, faça um novo pedido.')
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 1 || res.data.status == 2) {
        console.log(data.buy_id)
        if ($nuxt.$store.state.Layouts.config.pixel) {
          fbq("track", "Purchase", {
            content_ids: $nuxt.$store.state.Order.resumeList.map(function (elem) {
              return elem.id;
            }),
            content_type: "product",
            currency: "BRL",
            order_id: data.buy_id,
            value:
              parseFloat($nuxt.$store.state.Order.resumeList[0].products_value) +
              parseFloat($nuxt.$store.state.Order.resumeList[0].delivery_price),
          }, { eventID: data.buy_id });

        }

        if ($nuxt.$store.state.Layouts.config.api_conversion) {
          $nuxt.$store.dispatch("FacebookApiConversion/getUserData");
          $nuxt.$store.dispatch("FacebookApiConversion/getInfoToSendApi", {
            data: $nuxt.$store.state.Order.resumeList
            , event_name: "Purchase", code: data.buy_id
          });
        }

        commit('SET_PAYMENTMETHOD', 'pix')
        // commit('SET_DIALOG', false)
        $nuxt.$router.push({ path: `/pedido/status-pagamento/${payload.buy_id}` })

      }
    })
    .catch(e => {
      if (e.response.status == 422) {
        commit('SET_ERRORS', e.response.data.errors)
      } else {
        catchError(e.status)
      }
    })
    .finally(() => {
      // commit('SET_PAYMENTSPINNER', false)

      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const checkTotalBuyValue = function ({ commit }, payload) {
  let data = {
    company_id: storeId,
    buy_id: payload.buy_id
  }

  axios.post(`${baseApiUrl + defaultPath}check-order-price`, data)
    .then(res => {
      if (res.data.status == 401) {
        alert(res.data.data)
        $nuxt.$router.push({ path: '/' })
      }
      if (res.data.status == 201) {
        commit('SET_BUYVALUE', res.data.data.valueToPay)
        commit('SET_SENDTYPE', res.data.data.sendType)
        commit('SET_PAYMENTINFORMATION', res.data.data.payment_data)

      }
    })
    .catch(e => {
      catchError(e.status)
    })
    .finally(() => {
    });
}

const setBuyValue = function ({ commit }, value) {
  commit('SET_BUYVALUE', value)
}

const checkStatusPayment = function ({ commit }, payload) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start();
  });
  let data = {
    company_id: storeId,
    ...payload
  }

  axios.post(`${baseApiUrl + defaultPath}check-order-status`, data)
    .then(res => {
      if (res.data.status == 201) {
        commit('SET_STATUSPAYMENT', res.data.data)
      } else {
        this.$router.push({ path: `/` })
      }
    })
    .catch(e => {
      catchError(e.status)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const finishPayment = function ({ commit }, payload) {
  if ($nuxt.$store.state.Layouts.config.apiVersion && $nuxt.$store.state.Layouts.config.apiVersion.finishPayment) {
    switch ($nuxt.$store.state.Layouts.config.apiVersion.finishPayment) {
      case 'V1':
        return pay_V1({ commit }, payload);
      case 'V2':
        return pay_V2({ commit }, payload);
      default:
        return pay_V1({ commit }, payload);
    }
  } else {
    pay_V1({ commit }, payload);
  }
}

const finishPixPaymentIntermediary = function ({ commit }, payload) {
  console.log('aqui')
  commit('SET_PAYMENTSPINNER', true)
  commit('SET_DIALOG', true)
  let data = {
    company_id: storeId,
    ...payload
  }

  axios.post(`${baseApiUrl + defaultPath}pix-payment-intermediary`, data)
    .then(res => {
      if (res.data.status == 401) {
        alert(res.data.message)
        $nuxt.$router.push({ path: `/` })
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 100) {
        commit('SET_STATUSPAYMENT', 100)

      }
      if (res.data.status == 7) {
        commit('SET_STATUSPAYMENT', 7)
      }
      if ((res.data.status == 1 || res.data.status == 2)) {
        if ($nuxt.$store.state.Layouts.config.pixel) {
          fbq("track", "Purchase", {
            content_ids: $nuxt.$store.state.Order.resumeList.map(function (elem) {
              return elem.id;
            }),
            content_type: "product",
            currency: "BRL",
            order_id: data.buy_id,
            value:
              parseFloat($nuxt.$store.state.Order.resumeList[0].products_value) +
              parseFloat($nuxt.$store.state.Order.resumeList[0].delivery_price),
          }, { eventID: data.buy_id });
        }

        if ($nuxt.$store.state.Layouts.config.api_conversion) {
          $nuxt.$store.dispatch("FacebookApiConversion/getUserData");
          $nuxt.$store.dispatch("FacebookApiConversion/getInfoToSendApi", {
            data: $nuxt.$store.state.Order.resumeList
            , event_name: "Purchase", code: data.buy_id
          });
        }
        commit('SET_PAYMENTMETHOD', 'pix')
        commit('SET_PAYMENTSPINNER', false)
        commit('SET_PAYMENTSLIPCODE', res.data.pix_qr_code)
        commit('SET_DIALOG', false)
        $nuxt.$router.push({ path: `/pedido/status-pagamento/${payload.buy_id}` })
      }
    })
    .catch(e => {
      if (e.response.status == 422) {
        commit('SET_ERRORS', e.response.data.errors)
      } else {
        catchError(e.status)
      }
    })
    .finally(() => {
      commit('SET_PAYMENTSPINNER', false)

      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const pay_V1 = function ({ commit }, payload) {
  commit('SET_PAYMENTSPINNER', true)
  commit('SET_DIALOG', true)

  let data = {
    company_id: storeId,
    ...payload
  }
  if ($nuxt.$store.state.Layouts.config.clearSale.active) {
    data.sessionID = $nuxt.$store.state.ClearSale.sessionId
  }

  axios.post(`${baseApiUrl + defaultPath}sale`, data)
    .then(res => {
      if (res.data.status == 199) {
        alert('1 ou mais produtos da sua compra esgotaram, faça um novo pedido.')
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 401) {
        alert(res.data.message)
        $nuxt.$router.push({ path: `/` })
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 100) {
        commit('SET_STATUSPAYMENT', 100)

      }
      if (res.data.status == 7) {
        commit('SET_STATUSPAYMENT', 7)
      }
      if (res.data.status == 1 || res.data.status == 2) {
        if ($nuxt.$store.state.Layouts.config.pixel) {
          fbq("track", "Purchase", {
            content_type: "product",
            currency: "BRL",
            order_id: data.buy_id,
            value:
              parseFloat($nuxt.$store.state.Order.resumeList[0].products_value) +
              parseFloat($nuxt.$store.state.Order.resumeList[0].delivery_price),
          }, { eventID: data.buy_id });
        }

        if ($nuxt.$store.state.Layouts.config.api_conversion) {
          $nuxt.$store.dispatch("FacebookApiConversion/getUserData");
          $nuxt.$store.dispatch("FacebookApiConversion/getInfoToSendApi", {
            data: $nuxt.$store.state.Order.resumeList
            , event_name: "Purchase", code: data.buy_id
          });
        }
        commit('SET_PAYMENTSPINNER', false)
        commit('SET_DIALOG', false)
        $nuxt.$router.push({ path: `/pedido/status-pagamento/${payload.buy_id}` })

      }
    })
    .catch(e => {
      if (e.response.status == 422) {
        commit('SET_ERRORS', e.response.data.errors)
      } else {
        catchError(e.status)
      }
    })
    .finally(() => {
      commit('SET_PAYMENTSPINNER', false)

      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const pay_V2 = function ({ commit }, payload) {
  commit('SET_PAYMENTSPINNER', true)
  commit('SET_DIALOG', true)
  let data = {
    company_id: storeId,
    ...payload
  }
  if ($nuxt.$store.state.Layouts.config.clearSale.active) {
    data.sessionID = $nuxt.$store.state.ClearSale.sessionId
  }
  axios.post(`${baseApiUrl}/v2/ecommerce/payment/sale`, data)
    .then(res => {
      if (res.data.status == 199) {
        alert('1 ou mais produtos da sua compra esgotaram, faça um novo pedido.')
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 401) {
        alert(res.data.message)
        $nuxt.$router.push({ path: `/` })
        commit('SET_DIALOG', false)
      }
      if (res.data.status == 100) {
        commit('SET_STATUSPAYMENT', 100)

      }
      if (res.data.status == 7) {
        commit('SET_STATUSPAYMENT', 7)
      }
      if (res.data.status == 1 || res.data.status == 2) {
        if ($nuxt.$store.state.Layouts.config.pixel) {
          fbq("track", "Purchase", {
            content_type: "product",
            currency: "BRL",
            order_id: data.buy_id,
            value:
              parseFloat($nuxt.$store.state.Order.resumeList[0].products_value) +
              parseFloat($nuxt.$store.state.Order.resumeList[0].delivery_price),
          }, { eventID: data.buy_id });
        }
        if ($nuxt.$store.state.Layouts.config.api_conversion) {
          $nuxt.$store.dispatch("FacebookApiConversion/getUserData");
          $nuxt.$store.dispatch("FacebookApiConversion/getInfoToSendApi", {
            data: $nuxt.$store.state.Order.resumeList
            , event_name: "Purchase", code: data.buy_id
          });
        }
        commit('SET_PAYMENTSPINNER', false)
        commit('SET_DIALOG', false)
        $nuxt.$router.push({ path: `/pedido/status-pagamento/${payload.buy_id}` })

      }
    })
    .catch(e => {
      if (e.response.status == 422) {
        commit('SET_ERRORS', e.response.data.errors)
      } else {
        catchError(e.status)
      }
    })
    .finally(() => {
      commit('SET_PAYMENTSPINNER', false)

      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish();
      });
    });
}

const cleanBuyValue = function ({ commit }) {
  commit('SET_BUYVALUE', null)
  commit('SET_PAYMENTINFORMATION', null)
}

const cleanSendType = function ({ commit }) {
  commit('SET_SENDTYPE', null)
}

const cleanPaymentStatus = function ({ commit }) {
  commit('SET_PAYMENTMETHOD', 'card'),
    commit('SET_STATUSPAYMENT', null)
}

const cleanErrors = function ({ commit }) {
  commit('SET_ERRORS', null)
}

const remakePayment = function ({ commit }) {
  commit('SET_DIALOG', false)
}

const cleanDiscountCoupon = function ({ commit }) {
  commit('SET_DISCOUNTCOUPON', null)
  commit('SET_COUPONERRORS', null)
}






export default {
  cleanSendType,
  cleanErrors,
  remakePayment,
  checkTotalBuyValue,
  cleanBuyValue,
  finishPayment,
  cleanPaymentStatus,
  checkStatusPayment,
  addDiscountToBuy,
  cleanDiscountCoupon,
  setBuyValue,
  pixPayment,
  finishPixPaymentIntermediary
}