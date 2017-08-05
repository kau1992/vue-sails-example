const jwt = require('jsonwebtoken')
const tokenSecret = 'secretissecret'

module.exports = {

  /**
   * @param payload
   * @returns {*}
   */
  issue: payload => {
    return jwt.sign(payload, tokenSecret, {
      expiresIn: '7d'
    })
  },

  /**
   * @param token
   * @return {*}
   */
  verify: token => jwt.verify(token, tokenSecret)
}
