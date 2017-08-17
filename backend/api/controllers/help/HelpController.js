module.exports = {

  /**
   * @param req
   * @param res
   */
  postHelp: (req, res) => {
    var socket = req.socket;
    var io = sails.io;
    console.log('test')
    return res.ok()
  }
}
