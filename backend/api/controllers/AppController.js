module.exports = {

  /**
   * @param req
   * @param res
   */
  serve: (req, res) => {
    const fs = require('fs')

    let app = __dirname + '/../../assets/index.html'
    fs.createReadStream(app).pipe(res)
  }
}
