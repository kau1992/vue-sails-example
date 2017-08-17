module.exports = {

  /**
   * @param req
   * @param res
   */
  postProduct: (req, res) => {
    let {
      title,
      price,
      description
    } = req.allParams()
    let user = CryptographyService.decrypt(req.cookies.user)

    Product
      .create({
        title,
        description,
        price,
        user
      })
      .exec((error, product) => {
        if (error) return res.serverError(error)

        sails.log.info('Product created', product)

        if (product) return res.ok()
      })
  },

  /**
   * @param req
   * @param res
   */
  getProduct: (req, res) => {
    let id = req.param('id')
    let user = CryptographyService.decrypt(req.cookies.user)

    Product
      .findOne({
        id,
        user
      })
      .exec((error, product) => {
        if (error) return res.serverError(error)
        if (product) return res.json(product)
      })
  },

  /**
   * @param req
   * @param res
   */
  patchProduct: (req, res) => {
    let {
      id,
      title,
      price,
      description
    } = req.allParams()
    let user = CryptographyService.decrypt(req.cookies.user)

    Product
      .update({
        id,
        user
      }, {
        title,
        description,
        price
      })
      .exec((error, product) => {
        if (error) return res.serverError(error)

        sails.log.info('Product patched', product)

        if (product) return res.ok()
      })
  },

  /**
   * @param req
   * @param res
   */
  removeProduct: (req, res) => {
    let id = req.param('id')
    let user = CryptographyService.decrypt(req.cookies.user)

    Product
      .destroy({
        id,
        user
      })
      .exec(error => {
        if (error) return res.serverError(error)

        sails.log.info('Product removed')

        return res.ok()
      })
  }
}
