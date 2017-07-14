const jwt = require('jsonwebtoken')
const tokenSecret = 'secretissecret'

module.exports = {

  /**
   * @param payload
   * @returns {*}
   */
  issue: payload => {
    return jwt.sign(payload, tokenSecret, {
      expiresIn: 60 * 60 * 24
    })
  },

  /**
   * @param token
   * @return {*}
   */
  verify: token => {
    return jwt.verify(token, tokenSecret)
  }
}
