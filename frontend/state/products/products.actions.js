import Vue from 'vue'

const actions = {
  /**
   * @param context
   * @param page
   */
  getProducts (context, page) {
    Vue.http
      .get('/api/products/get', {
        params: {
          page
        }
      })
      .then(response => {
        context.commit('SET_PRODUCTS', response.body)
      }, error => {
        console.error(error)
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
        }, error => {
          reject(error)
        })
    })
  },

  /**
   * @param context
   */
  getProductsByUser (context) {
    Vue.http
      .get('/api/user/products/getByUser')
      .then(response => {
        context.commit('SET_PRODUCTS', response.body)
      }, error => {
        console.error(error)
      })
  }
}

export default actions
