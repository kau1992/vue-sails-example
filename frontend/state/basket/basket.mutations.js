const mutations = {
  /**
   * @param state
   * @param isUserAuthenticated
   */
  SET_IS_USER_AUTHENTICATED (state, isUserAuthenticated) {
    state.isUserAuthenticated = isUserAuthenticated
  },

  /**
   * @param state
   * @param product
   * @constructor
   */
  PUSH_TO_BASKET (state, product) {
    state.basket.products.push(product)
  },

  /**
   * @param state
   * @param index
   * @constructor
   */
  REMOVE_PRODUCT_FROM_BASKET (state, index) {
    state.basket.products.splice(index, 1)
  },

  CHECKOUT (state) {
    // Implement
  },

  /**
   * qparam state
   */
  RESET_BASKET (state) {
    state.basket = {
      id: Math.random().toString(36).substr(2, 10),
      products: []
    }
  }
}

export default mutations
