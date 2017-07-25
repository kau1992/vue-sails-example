import Vue from 'vue'

const actions = {

  /**
   * @param context
   * @param basket
   * @returns {Promise}
   */
  checkout (context, basket) {
    return new Promise((resolve, reject) => {
      Vue.http
        .post('/api/user/basket/post', {
          products: basket.products
        })
        .then(() => {
          context.commit('RESET_BASKET')
          resolve()
        }, error => reject(error))
    })
  }
}

export default actions
