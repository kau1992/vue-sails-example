const actions = {
  /**
   * @param id
   * @returns {Promise}
   */
  getProduct ({}, id) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/user/product/get', {
          params: {
            id
          }
        })
        .then(response => {
          resolve(response.body)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * @param id
   * @returns {Promise}
   */
  removeProduct ({}, id) {
    return new Promise((resolve, reject) => {
      Vue.http
        .delete('/api/user/product/remove', {
          params: {
            id
          }
        })
        .then(() => {
          resolve()
        }, error => {
          reject(error)
        })
    })
  },

  /**
   * @param context
   * @param parameters
   */
  saveProduct (context, parameters) {
    return new Promise((resolve, reject) => {
      Vue.http
        .post('/api/user/product/post', {
          title: parameters.product.title,
          description: parameters.product.description,
          price: parameters.product.price
        })
        .then(() => {
          context.commit('RESET_PRODUCT')
          resolve()
        }, error => {
          reject(error)
        })
    })
  },

  /**
   * @param parameters
   * @returns {Promise}
   */
  patchProduct ({}, parameters) {
    return new Promise((resolve, reject) => {
      Vue.http
        .patch('/api/user/product/patch', {
          id: parameters.id,
          title: parameters.title,
          price: parameters.price,
          description: parameters.description
        })
        .then(() => {
          resolve()
        }, error => {
          reject(error)
        })
    })
  }
}

export default actions
