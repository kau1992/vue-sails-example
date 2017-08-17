import Vue from 'vue'

const actions = {
  /**
   * @param id
   * @returns {Promise}
   */
  getProduct ({}, id) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/user/products/product/get', {
          params: {
            id
          }
        })
        .then(response => resolve(response.body))
        .catch(error => reject(error))
    })
  },

  /**
   * @param id
   * @returns {Promise}
   */
  deleteProduct ({}, id) {
    return new Promise((resolve, reject) => {
      Vue.http
        .delete('/api/user/products/product/delete', {
          params: {
            id
          }
        })
        .then(() => resolve())
        .catch(error => reject(error))
    })
  },

  /**
   * @param context
   * @param parameters
   */
  postProduct (context, parameters) {
    return new Promise((resolve, reject) => {
      Vue.http
        .post('/api/user/products/product/post', {
          title: parameters.product.title,
          description: parameters.product.description,
          price: parameters.product.price
        })
        .then(() => {
          context.commit('RESET_PRODUCT')
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  /**
   * @param parameters
   * @returns {Promise}
   */
  patchProduct ({}, parameters) {
    return new Promise((resolve, reject) => {
      Vue.http
        .patch('/api/user/products/product/patch', {
          id: parameters.id,
          title: parameters.title,
          price: parameters.price,
          description: parameters.description
        })
        .then(() => {
          resolve()
        })
        .catch(error => reject(error))
    })
  }
}

export default actions
