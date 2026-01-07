const defaultPath = '/ecommerce/adress'
import { baseApiUrl, catchError } from "@/Settings/global";
import axios from 'axios'

let list = []

const save = function ({ commit }, payload) {

  $nuxt.$nextTick(() => {
    $nuxt.$loading.startModalSpinner()
  })

  axios.post(`${baseApiUrl + defaultPath}/save`, payload)
    .then(res => {
      if (res.data.status == 201) {
        commit('SET_FORMDATA', {
          id: null,
          street: null,
          cep: null,
          neighborhood: null,
          city: null,
          state: null,
          active: null,
          note: null,
          company_id: null
        })
        commit('SET_ERRORS', '')
        setList({ commit })
        setRegisterNewAddress({ commit }, false)
      } else {
        commit('SET_ERRORS', res.data.errors)
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
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finishModalSpinner()
      })
    });

}

const cleanAddressItem = function ({ commit }) {
  commit('SET_FORMDATA', {
    id: null,
    street: null,
    cep: null,
    neighborhood: null,
    city: null,
    state: null,
    active: null,
    note: null,
    company_id: null
  })
}

const cleanList = function ({ commit }) {
  commit('SET_LIST', list)
}

const setList = ({ commit }) => {
  if ($nuxt.$store.state.User.user.id) {
    $nuxt.$nextTick(() => {
      $nuxt.$loading.start()
    })

    axios.post(`${baseApiUrl + defaultPath}/index`).then(res => {
      commit('SET_LIST', res.data)
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
}

const cleanErrors = function ({ commit }) {
  commit('SET_ERRORS', '')
}

const setRegisterNewAddress = function ({ commit }, value) {
  commit('SET_REGISTERNEWADDRESS', value)
}

const apiCep = function ({ commit, state }) {
  let data = state.formData
  let cepToCheck = state.formData.cep.replace(/\.|\-/g, "");
  if (cepToCheck.length == 8) {
    $nuxt.$nextTick(() => {
      $nuxt.$loading.startModalSpinner()
    })
    $nuxt.$viaCep.buscarCep(cepToCheck).then((obj) => {
      commit('SET_FORMDATA', {
        street: obj.logradouro,
        neighborhood: obj.bairro,
        city: obj.localidade,
        state: obj.uf,
        cep: cepToCheck,
        number: data.number
      })
    }).finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finishModalSpinner()
      })
    });;
  }
}

export default {
  setList,
  save,
  cleanErrors,
  cleanAddressItem,
  cleanList,
  apiCep,
  setRegisterNewAddress,
  setList
}