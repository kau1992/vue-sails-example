const mutations = {
  /**
   * @param state
   * @param title
   */
  SET_PRODUCT_TITLE (state, title) {
    state.product.title = title
  },

  /**
   * @param state
   * @param description
   */
  SET_PRODUCT_DESCRIPTION (state, description) {
    state.product.description = description
  },

  /**
   * @param state
   * @param price
   */
  SET_PRODUCT_PRICE (state, price) {
    state.product.price = price
  },

  /**
   * @param state
   * @param isEditProductVisible
   * @constructor
   */
  SET_IS_EDIT_PRODUCT_VISIBLE (state, isEditProductVisible) {
    state.product.meta.isEditProductVisible = isEditProductVisible
  },

  /**
   * @param state
   */
  RESET_PRODUCT (state) {
    state.product.title = ''
    state.product.description = ''
    state.product.price = null
  }
}

export default mutations
