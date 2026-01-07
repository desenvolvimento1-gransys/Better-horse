import { baseApiUrl, catchError, storeId, itensPerPage } from "@/Settings/global";
import axios from "axios";

let defaultPath = '/ecommerce/product/'


const setProduct = function ({ commit, getters, state }, payload) {
  commit('SET_LOAD', true)
  $nuxt.$nextTick(() => {
    $nuxt.$nuxt.$loading.start();
  }),
    axios
      .post(`${baseApiUrl + defaultPath}show`, {
        company_id: storeId,
        ...payload,
      })
      .then((res) => {
        commit('SET_PRODUCT', res.data)
        if (res.data.product_image[0]) {
          commit('SET_SELECTEDIMG', res.data.product_image[0].img_name)
        }
        if (res.data.grid[0] && res.data.grid[0].code_color) {
          commit('SET_SELECTEDCOLOR', res.data.grid[0].code_color)
        }
        if (res.data.grid[0] && $nuxt.$store.state.Layouts.config.product.selectSizeIfOnlyOne) {
          if (getters.ordenateAvailablesSizes.length < 2) {
            commit('SET_SELECTEDSIZE', res.data.grid[0].size)
          }
        }
        selectImgAccodiingColor({ getters, state, commit })
        if ($nuxt.$store.state.Layouts.config.pixel) {
          fbq("track", "ViewContent", { page: "product", ...res.data });
        }
      })
      .catch((e) => {
        catchError(e);
      })
      .finally(() => {
        $nuxt.$nextTick(() => {
          $nuxt.$nuxt.$loading.finish();
          commit('SET_LOAD', false)
        });
      });
}

const calculateProductDelivery = function ({ commit, state }, cep) {

  commit('SET_DELIVERY_SPINNER', true)
  // console.log(state.product.grid[0])

  let data = {
    grids: [{
      grid_id: state.product.grid[0].id, amount: 1
    }],
    cep: cep
  }

  axios.post(`${baseApiUrl}/v2/ecommerce/delivery/check`, data)

    .then(res => {
      if (res.data.status == 201) {
        // console.log(res.data.data)
        commit('SET_DELIVERY_CONSULT', res.data.data)
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
      commit('SET_DELIVERY_SPINNER', false)

    });
}

const setSelectedImg = function ({ commit }, payload) {
  commit('SET_SELECTEDIMG', payload)
}

const setSelectedColor = function ({ commit, state, getters }, payload) {
  commit('SET_SELECTEDCOLOR', payload)
  selectImgAccodiingColor({ getters, state, commit })
  checkIfSizeSelectedIsAvailabe({ getters, state, commit })
}

const setSelectedSize = function ({ commit }, payload) {
  commit('SET_SELECTEDSIZE', payload)
}

const cleanState = function ({ commit }) {
  commit('SET_PRODUCT', [])
  commit('SET_SELECTEDIMG', null)
  commit('SET_SELECTEDCOLOR', null)
  commit('SET_SELECTEDSIZE', null)
  commit('SET_LOAD', true)
  commit('SET_ATRIBUTES', [])
}

const setGridIdAndAddItemInCart = function ({ state, getters }, amount) {
  // checkIfHaveRequiredAtributes()
  let gridData = state.product.grid;
  let gridId = null
  if (!amount) {
    amount = 1
  }
  if (!checkIfHaveRequiredAtributes()) {
    if (!getters.ordenateAvailablesSizes.includes(null) && !state.selectedSize) {
      alert(`* Selecione um Tamanho !!!`);
    }
    if (!state.selectedColor) {

      alert(`* Selecione uma Cor !!!`);
    }

    if (state.selectedColor && (getters.ordenateAvailablesSizes.includes(null) || state.selectedSize)) {
      gridId = gridData.filter(
        (el) =>
          el.size === state.selectedSize &&
          el.code_color === state.selectedColor
      );
      let send = { amount: amount, grid_id: gridId[0].id, atributes: state.atributes }
      $nuxt.$store.dispatch("Cart/addGridInStorage", send);
    }
  }
}

//Private Functions
const selectImgAccodiingColor = function ({ getters, state, commit }) {
  let response = state.product.product_image.filter(
    (el) => el.color === getters.selectedColorName
  );
  if (response[0]) {
    commit('SET_SELECTEDIMG', response[0].img_name)
  }
}

const checkIfHaveRequiredAtributes = function () {
  let requiredEmpty = false
  if ($nuxt.$store.state.Layouts.config.atribute && $nuxt.$store.state.Layouts.config.atribute.show) {
    let atributeRequiredFields = $nuxt.$store.state.Layouts.config.atribute.atributes.filter((value) => value.required == true);
    atributeRequiredFields.map(function (elem) {
      var requiredField = ($nuxt.$store.state.Product.product.product_atribute.filter((value) => value.group_name == elem.atributeName))[0]
      if (requiredField !== undefined) {
        if (($nuxt.$store.state.Product.atributes.filter((value) => value.group_name == requiredField.group_name)).length == 0 && !requiredEmpty) {
          alert(`O campo ${requiredField.group_name} é requerido para este produto !!`)
          requiredEmpty = true
          // return false;
        }
      }
    });
  }

  return requiredEmpty
}

const sendWarnMeData = function ({ commit }, payload) {

  let data = {
    ...payload,
    company_id: storeId
  }

  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })

  axios.post(`${baseApiUrl}/ecommerce/product/warn-me`, data)
    .then(res => {
      if (res.data.status == 201) {
        commit('SET_WARNME_TOAST_MESSAGE', 'Certo, você será avisado(a) assim que o produto estiver disponível!');

      } else {
        commit('SET_WARNME_TOAST_MESSAGE', 'Infelizmente algo deu errado!!');
      }
    })
    .catch(e => {
      catchError(e.status)
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish()
      })
    });
}

const checkIfSizeSelectedIsAvailabe = function ({ getters, state, commit }) {
  if (!getters.enabledSizes.includes(state.selectedSize)) {
    commit('SET_SELECTEDSIZE', null)
  }
}


export default {
  calculateProductDelivery,
  setProduct,
  setSelectedImg,
  setSelectedColor,
  setSelectedSize,
  cleanState,
  setGridIdAndAddItemInCart,
  checkIfHaveRequiredAtributes,
  sendWarnMeData
}