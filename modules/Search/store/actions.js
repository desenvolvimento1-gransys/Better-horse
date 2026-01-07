import { baseApiUrl, catchError, storeId, itensPerPage } from "@/Settings/global";
import axios from "axios";

let defaultPath = '/ecommerce/search/'

const callParamsSearch = function ({ commit }, payload, filters) {
  if (filters) {
    defaultWithFiltersSearch({ commit }, payload)
  } else {
    defaultSearch({ commit }, payload)
  }

}

const callSearch = function ({ commit }, payload) {
  if (payload.text !== undefined) {
    searchText({ commit }, payload)
  } else {
    if ($nuxt.$store.state.Layouts.config.search.filters && $nuxt.$route.path !== '/') {
      defaultWithFiltersSearch({ commit })
    } else {
      defaultSearch({ commit })
    }
  }
}

const getSearchParams = function ({ commit }) {
  let result = null;
  let data = $nuxt.$store.state.Settings.routeSearchSettings
  if ($nuxt.$route.path == '/') {
    return $nuxt.$store.state.Settings.home.searchParams
  } else {
    let path = $nuxt.$route.path.replace('/busca', '')
    if ((path.substr(path.length - 1)) == '/') {
      path = path.slice(0, -1)
    }
    result = data.filter(route => route.route == path)
    commit('SET_SECTIONNAME', result[0].name)
    return result[0].params
  }
}

const defaultSearch = function ({ commit }, params) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })
  if (!params) {
    params = getSearchParams({ commit })
  }
  let payload = {
    ...params,
    company_id: storeId,
  }
  if (!params.items_per_page) {
    payload.items_per_page = itensPerPage
  }
  let data = $nuxt.$store.state.Search.list
  if ($nuxt.$store.state.Search.selectedSizes) {
    data = []
    payload.sizes = $nuxt.$store.state.Search.selectedSizes
  }
  if ($nuxt.$store.state.Search.selectedColors) {
    data = []
    payload.colors = $nuxt.$store.state.Search.selectedColors
  }

  axios.post(`${baseApiUrl + defaultPath}default-search`, payload)
    .then(res => {
      data.push(...res.data.data)
      if (data < 1) {
        commit('SET_SMILE', true)
      }
      commit('SET_LIST', data)
      commit('SET_CURRENTPAGE', res.data.current_page)
      commit('SET_PAGES', res.data.last_page)
      commit('SET_LOADEDSEARCH', true)

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

const defaultWithFiltersSearch = function ({ commit }, params) {
  commit('SET_LIST', [])
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  })
  if (!params) {
    params = getSearchParams({ commit })
  }
  let payload = {
    ...params,
    company_id: storeId,
    items_per_page: itensPerPage
  }
  if (!params.items_per_page) {
    payload.items_per_page = itensPerPage
  }

  axios.post(`${baseApiUrl + defaultPath}default-search-filters`, payload)
    .then(res => {
      if(Object.keys($nuxt.$route.query).length == 0) {
        let data = $nuxt.$store.state.Search.list
        data.push(...res.data.data.data)
        if (data < 1) {
          commit('SET_SMILE', true)
        }
        commit('SET_LIST', data)
      }
      
      commit('SET_CURRENTPAGE', res.data.data.current_page)
      commit('SET_PAGES', res.data.data.last_page)
      commit('SET_LOADEDSEARCH', true)
      commit('SET_SIZES', res.data.filters.sizes)
      commit('SET_COLORS', res.data.filters.colors)
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

const searchText = function ({ commit }, payload) {
  $nuxt.$nextTick(() => {
    $nuxt.$loading.start()
  }),
    axios
      .post(`${baseApiUrl + defaultPath}text`, {
        company_id: storeId,
        ...payload,
      })
      .then((res) => {
        commit('SET_LIST', res.data)
        commit('SET_LOADEDSEARCH', true)
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

const nextPageDefaultSearch = function ({ commit, state }) {

  commit('SET_NEXTPAGESPINNER', true)
  let params = getSearchParams({ commit })
  let payload = {
    ...params,
    company_id: storeId,
    items_per_page: itensPerPage,
    page: state.currentPage + 1
  }
  if ($nuxt.$store.state.Search.selectedSizes) {
    payload.sizes = $nuxt.$store.state.Search.selectedSizes
  }
  if ($nuxt.$store.state.Search.selectedColors) {
    payload.colors = $nuxt.$store.state.Search.selectedColors
  }

  axios.post(`${baseApiUrl + defaultPath}default-search`, payload)
    .then(res => {
      let data = $nuxt.$store.state.Search.list
      data.push(...res.data.data)
      if (data < 1) {
        commit('SET_SMILE', true)
      }
      commit('SET_LIST', data)
      commit('SET_CURRENTPAGE', res.data.current_page)
      commit('SET_PAGES', res.data.last_page)
    })
    .catch(e => {
      catchError(e)
    })
    .finally(() => {
      commit('SET_NEXTPAGESPINNER', false)
    });
}

const setSelectedColors = function ({ commit }, value) {
  commit('SET_SELECTEDCOLORS', value)
}

const setSelectedSizes = function ({ commit }, value) {
  commit('SET_SELECTEDSIZES', value)
}

const cleanSelectedColors = function ({ commit }, value) {
  commit('SET_SELECTEDCOLORS', value)
}

const cleanSelectedSizes = function ({ commit }, value) {
  commit('SET_SELECTEDSIZES', value)
}

const cleanColors = function ({ commit }) {
  commit('SET_COLORS', [])
}

const cleanSizes = function ({ commit }, value) {
  commit('SET_SIZES', [])
}


const cleanList = function ({ commit }) {
  commit('SET_LIST', [])
  commit('SET_CURRENTPAGE', 0)
  commit('SET_PAGES', 0)
  commit('SET_SMILE', false)
  commit('SET_SECTIONNAME', null)
  commit('SET_LOADEDSEARCH', false)
}





export default {
  callSearch,
  defaultSearch,
  defaultWithFiltersSearch,
  cleanList,
  setSelectedColors,
  setSelectedSizes,
  cleanSelectedColors,
  cleanSelectedSizes,
  cleanColors,
  cleanSizes,
  nextPageDefaultSearch,
  callParamsSearch
}