import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user.module'
import product from './product/product.module'
import products from './products/products.module'
import basket from './basket/basket.module'

Vue.use(Vuex)

/**
 * @see {@link https://stackoverflow.com/questions/10730362/get-cookie-by-name#answer-40786371}
 * @param name
 * @returns {string}
 */
const getCookie = name => {
  let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
  return a ? a[1] : ''
}

export default new Vuex.Store({
  modules: {
    User: user,
    Product: product,
    Products: products,
    Basket: basket
  },
  state: {
    locale: 'en',
    isUserAuthenticated: !!(getCookie('user'))
  },

  mutations: {

    /**
     * @param state
     * @param isUserAuthenticated
     */
    SET_IS_USER_AUTHENTICATED (state, isUserAuthenticated) {
      state.isUserAuthenticated = isUserAuthenticated
    },

    /**
     * @param state
     * @param locale
     * @constructor
     */
    SET_LOCALE (state, locale) {
      state.locale = locale
    }
  }
})
