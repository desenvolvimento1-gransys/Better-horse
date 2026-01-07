import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from "axios";

let defaultPath = '/cart/'


const addGridInStorage = function ({ commit, state }, payload) {
  if ($nuxt.$store.state.Layouts.config.pixel) {
    fbq("track", "addToCart", { ...cartStorageToSend, ...$nuxt.$store.state.Product.product });
  }
  let json = localStorage.getItem("cart")
  let cartStorageData = JSON.parse(json);
  let cartStorageToSend = []

  if (cartStorageData) {
    if (checkIfGridAreInCart([payload], cartStorageData)) {
      alert("Produto Já esta no carrinho !!!")
    } else {
      cartStorageToSend = cartStorageData
      cartStorageToSend.push(payload)
      localStorage.setItem("cart", JSON.stringify(cartStorageToSend));
      setCartModal({ commit, state }, true)
    }
  } else {
    cartStorageToSend.push(payload)
    localStorage.setItem("cart", JSON.stringify(cartStorageToSend));
    setCartModal({ commit, state }, true)

  }
}

const setCartModal = function ({ commit, state }, payload) {
  commit('SET_CARTMODAL', payload)
  if (payload == true) {
    showCartItems({ commit, state }, 'modal')
  }
}

const showCartItems = ({ commit, state }, spinner = 'full') => {
  let json = localStorage.getItem("cart")
  let cartStorageData = JSON.parse(json);
  let mapCartItems = null
  if (cartStorageData) {
    mapCartItems = cartStorageData.map(a => a.grid_id)
  }

  if (mapCartItems !== null) {
    $nuxt.$nextTick(() => {
      if (spinner == 'empty') {

      } else {

        if (spinner == 'full') {
          $nuxt.$loading.start()
        } else {
          $nuxt.$loading.startModalSpinner()
        }
      }
    })
    axios
      .post(`${baseApiUrl + defaultPath}show-id-products`, {
        company_id: storeId,
        grid_ids: mapCartItems
      })
      .then(res => {
        if (res.data) {
          commit('SET_CARTDATA', addAmountAndAtributesToResponseBasedStorage(res.data))
          localStorage.setItem("cart", JSON.stringify(addAmountAndAtributesToResponseBasedStorage(res.data)));
        }

      })
      .catch(e => {
        catchError(e);
      })
      .finally(() => {

        $nuxt.$nextTick(() => {
          if (spinner == 'full') {
            $nuxt.$loading.finish()
          } else {
            $nuxt.$loading.finishModalSpinner()
          }
        })
        setToAmountIfNoStock({ state })
      });
  }
}

const changeItemAmount = function ({ state }, payload) {
  if (parseFloat(payload.amount) > 0) {
    state.cartData[payload.index].amount = parseFloat(payload.amount)
  } else {
    state.cartData[payload.index].amount = 1
  }
  if (state.cartData[payload.index].amount > state.cartData[payload.index].balance) {
    alert(`Apenas ${state.cartData[payload.index].balance} peça em Estoque`)
    state.cartData[payload.index].amount = parseFloat(state.cartData[payload.index].balance)
  }
  changeGridStorage({ state })
}

const removeItem = function ({ state, commit }, indexPosition) {
  state.cartData.splice(indexPosition, 1);
  changeGridStorage({ state })
  if (!state.cartData[0]) {
    commit('SET_CARTMODAL', false)
  }
}

const closeOrder = function ({ state, commit }) {
  if ($nuxt.$store.state.Layouts.config.pixel) {
    fbq("track", "InitiateCheckout", { ...$nuxt.$store.state.Cart.cartData });
  }
  if (!$nuxt.$store.state.User.user.id) {
    commit('SET_CLOSINGORDER', true)
    $nuxt.$router.push({ path: '/login' })
  } else {
    removeItemFromArrayIfNoStock({ state, commit })
    addCartInWebservice();

  }
}

const setClosingOrder = function ({ commit }, payload) {
  commit('SET_CLOSINGORDER', payload)
}

const addCartInWebservice = function () {
  let json = localStorage.getItem("cart")
  let cartStorageData = JSON.parse(json);

  let data = {
    company_id: storeId,
    grids: cartStorageData
  }
  axios.post(`${baseApiUrl}/order/add-items`, data)
    .then(res => {
      if (res.data.status == 201) {
        $nuxt.$store.dispatch("Order/setCloseOrderModal", true);
      }
    })
    .catch(e => {
      if (e.response.status == 422) {
        commit('SET_ERRORS', e.response.data.errors)
      } else {
        catchError(e.status)
      }
    })
}

const cleanCart = function ({ commit }) {
  commit("SET_CARTDATA", [])
}



//PRIVATE FUNCTIONS
const changeGridStorage = function ({ state }) {
  localStorage.removeItem("cart");
  let mapCart = state.cartData.map((a) => ({
    amount: parseFloat(a.amount),
    grid_id: a.grid_id,
    atributes: a.atributes
  }));
  localStorage.setItem("cart", JSON.stringify(mapCart));
}

const addAmountAndAtributesToResponseBasedStorage = function (products) {
  let response = []
  for (let i = 0; i < products.length; ++i) {
    let addAmmount = { ...products[i], amount: checkAmountBasedInGridIdStorage(products[i].grid_id), atributes: checkAtributeBasedInGridIdStorage(products[i].grid_id) }
    response.push((addAmmount));
  }

  return response;
}

const setToAmountIfNoStock = function ({ state }) {
  for (let i = 0; i < state.cartData.length; ++i) {
    if (parseFloat(state.cartData[i].balance) < state.cartData[i].amount) {
      state.cartData[i].amount = parseFloat(state.cartData[i].balance)
      changeGridStorage({ state })
    }
  }
}

const checkAmountBasedInGridIdStorage = function (grid_id) {
  let json = localStorage.getItem("cart")
  let cartStorageData = JSON.parse(json);
  let result = cartStorageData.filter(el => el.grid_id === grid_id);

  return result[0].amount;
}

const checkAtributeBasedInGridIdStorage = function (grid_id) {
  let json = localStorage.getItem("cart")
  let cartStorageData = JSON.parse(json);
  let result = cartStorageData.filter(el => el.grid_id === grid_id);

  return result[0].atributes;
}

const checkIfGridAreInCart = function (input, cartOldItems) {
  let mapcartOldItems = cartOldItems.map(a => a.grid_id)
  let mapInput = input.map(a => a.grid_id)
  if (mapcartOldItems.includes(parseInt(mapInput))) {
    return true
  } else {
    return false
  }
}

const removeItemFromArrayIfNoStock = function ({ state, commit }) {
  let data = state.cartData.filter((cart) => {
    return cart.balance > 0;
  })


  localStorage.setItem("cart", JSON.stringify(data));

  commit('SET_CARTDATA', data)
}

//END PRIVATE

export default {
  addGridInStorage,
  setCartModal,
  showCartItems,
  changeItemAmount,
  removeItem,
  closeOrder,
  setClosingOrder,
  cleanCart
}