import Vue from 'vue'

const actions = {
  /**
   * @param context
   * @param page
   */
  getProducts (context, page) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/products/get', {
          params: {
            page
          }
        })
        .then(response => {
          context.commit('SET_PRODUCTS', response.body)
          resolve()
        })
        .catch(error => reject(error))
      })
  },

  /**
   * @param context
   * @param page
   */
  getShopProducts (context, page) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/user/products/get', {
          params: {
            page
          }
        })
        .then(response => {
          context.commit('SET_PRODUCTS', response.body)
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  /**
   * @param context
   */
  getProductsByUser (context) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/user/products/getProductsByUser')
        .then(response => {
          context.commit('SET_PRODUCTS', response.body)
          resolve()
        })
        .catch(error => reject(error))
    })
  }
}

export default actions
