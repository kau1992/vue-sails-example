import Vue from 'vue'

const actions = {

  /**
   * @param context
   */
  getUser (context) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get('/api/user/get')
        .then(response => {
          context.commit('SET_USER', response.body)
          resolve()
        }, error => {
          reject(error)
        })
    })
  },

  /**
   * @param context
   * @param user
   */
  saveUser (context, user) {
    Vue.http
      .post('/api/register/post', {
        name: user.name,
        password: user.password
      })
      .then(() => {
        context.commit('RESET_USER')
      })
      .catch(error => {
        console.error(error)
      })
  },

  /**
   * @param context
   * @param user
   */
  loginUser (context, user) {
    return new Promise((resolve, reject) => {
      Vue.http
        .post('/api/login/post', {
          name: user.name,
          password: user.password
        })
        .then(response => {
          context.commit('SET_IS_USER_AUTHENTICATED', true)
          resolve(response.body)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default actions
