const mutations = {

  /**
   * @param state
   * @param user
   * @constructor
   */
  SET_USER (state, user) {
    state.user = user
  },

  /**
   * @param state
   * @param name
   */
  SET_USER_NAME (state, name) {
    state.user.name = name
  },

  /**
   * @param state
   * @param password
   */
  SET_USER_PASSWORD (state, password) {
    state.user.password = password
  },

  /**
   * @param state
   */
  RESET_USER (state) {
    state.user.name = ''
    state.user.password = ''
  }
}

export default mutations
