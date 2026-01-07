
const defaultPath = '/ecommerce/people'

import { baseApiUrl, catchError } from "@/Settings/global";
import axios from 'axios'

let formData = {
  id: null,
  created_at: null,
  updated_at: null,
  fantasy_name: null,
  social_name: null,
  birthday: null,
  cpf_cnpj: null,
  company: false,
  phone_number: null,
  optional_phone_number: null,
  gender: null
}

let errors = {
  id: null,
  created_at: null,
  updated_at: null,
  fantasy_name: null,
  social_name: null,
  birthday: null,
  cpf_cnpj: null,
  company: false,
  phone_number: null,
  optional_phone_number: null,
  gender: null
}



const show = function ({ commit }) {

  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })

  axios
    .post(`${baseApiUrl + defaultPath}/show`)
    .then(res => {
      commit('SET_FORMDATA', res.data);
    })
    .catch(e => {
      catchError(e);
    })
    .finally(() => {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.finish()
      })
    });
}

const cleanErrors = function ({ commit }) {
  commit('SET_ERRORS', errors)
}

const cleanPeople = function ({ commit }) {
  commit('SET_FORMDATA', formData)
}



export default {
  cleanPeople,
  cleanErrors,
  show,
}