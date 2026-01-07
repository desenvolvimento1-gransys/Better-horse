import { baseApiUrl, catchError, storeId, itensPerPage } from "@/Settings/global";
import axios from "axios";

let defaultPath = '/ecommerce/auth/'

let resetPasswordErrors = {
    email: null,
    password: null,
    password_confirmation: null
}

const checkAccountLostToken = ({ commit }, payload) => {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        token: payload
    }
    axios
        .post(`${baseApiUrl + defaultPath}find-token`, data)
        .then(res => {
            if (res.data.status !== 202) {
                alert(res.data.message)
                $nuxt.$router.push({ path: '/' })
            }
        })
        .catch(e => {
            catchError(e.response.status);
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}

const register = ({ commit }, payload) => {
    if (payload.phone_number) {
        payload.phone_number = payload.phone_number.replace(
            /\(|\)|\s|\-/g,
            ""
        );
    }
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        ...payload,
        company_id: storeId
    }
    commit('SET_FORMERRORS', {})
    axios.post(`${baseApiUrl + defaultPath}register-with-people`, data)
        .then(res => {
            if (res.data.user.token) {
                afterLogin({ commit }, res.data.user);
            }
        })
        .catch(e => {
            if (e.response.status == 422) {
                commit('SET_FORMERRORS', e.response.data.errors)
            } else {
                catchError(e.status)
            }
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}

const login = ({ commit }, payload) => {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        ...payload,
        company_id: storeId
    }
    axios
        .post(`${baseApiUrl + defaultPath}login`, data)
        .then(res => {
            if (res.data.token) {
                afterLogin({ commit }, res.data);
            } else {
                alert('Algo deu errado, confira seus dados !!')
            }
        })
        .catch(e => {
            if (e.response !== undefined) {
                if (e.response.data.errors) {
                    commit('SET_LOGINERRORS', e.response.data.errors)
                } else {
                    catchError(e.response.status);
                }
            }
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}

const checkLoged = ({ commit }) => {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        company_id: storeId
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    axios
        .post(`${baseApiUrl + defaultPath}check`, data)
        .then(res => {
            if (res.data.id) {
                commit('SET_USER', res.data)
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        })
        .catch(e => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // commit('SET_ERRORS', e)
        })
        .finally(() => {
            commit('SET_STARTAPPP', true)
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}

const logout = ({ commit }) => {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    axios
        .post(`${baseApiUrl + defaultPath}logout`)
        .then(res => {
            if (res.data.status == 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                $nuxt.$router.push({ path: '/' })
                commit('SET_USER', {})
            }
        })
        .catch(e => {
            catchError(e.response.status);
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });


}

const accountLost = ({ commit }, payload) => {

    commit('SET_ACCOUNTLOSTERRORS', null)

    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        email: payload,
        company_id: storeId
    }
    axios
        .post(`${baseApiUrl + defaultPath}forgot`, data)
        .then(res => {
            if (res.data.status == 409) {
                commit('SET_ACCOUNTLOSTERRORS', res.data.message)
            }
            if (res.data.status == 201) {
                commit('SET_ACCOUNTLOSTERRORS', res.data.message)
            }
        })
        .catch(e => {
            if (e.response.data.errors) {
                commit('SET_ACCOUNTLOSTERRORS', e.response.data.errors.email)
            } else {
                catchError(e.response.status);
            }
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });

}

const cleanAccountLostErrors = function ({ commit }) {
    commit("SET_ACCOUNTLOSTERRORS", null)
}

const cleanResetPasswordErrors = ({ commit }) => {
    commit('SET_RESETPASSWORDERRORS', resetPasswordErrors)
}

const resetPassword = ({ commit }, payload) => {
    $nuxt.$nextTick(() => {
        $nuxt.$loading.start()
    })
    let data = {
        ...payload
    }
    axios
        .post(`${baseApiUrl + defaultPath}reset-password`, data)
        .then(res => {
            // 'status' => 401,  'message' => 'Token Invalido !!!'
            if (res.data.status == 202) {
                alert(res.data.message)
                $nuxt.$router.push({ path: '/' })
            }
            if (res.data.status == 401) {
                alert(res.data.message)
                $nuxt.$router.push({ path: '/' })
            }
        })
        .catch(e => {
            if (e.response.data.errors) {
                commit('SET_RESETPASSWORDERRORS', e.response.data.errors)
            } else {
                catchError(e.response.status);
            }
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}


//Privates
const afterLogin = function ({ commit }, payload) {
    commit('SET_USER', payload)
    localStorage.setItem("token", payload.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
    if ($nuxt.$store.state.Cart.closingOrder) {
        $nuxt.$router.push({ path: '/carrinho' })
        $nuxt.$store.dispatch('Cart/setClosingOrder', false)
    } else {
        $nuxt.$router.push({ path: '/' })
    }
}
//End

export default {
    register,
    login,
    checkLoged,
    logout,
    accountLost,
    cleanAccountLostErrors,
    checkAccountLostToken,
    cleanResetPasswordErrors,
    resetPassword
}