const sails = require('sails')
const request = require('supertest')
const chai = require('chai')
const sinon = require('sinon')
const faker = require('faker')

describe('Product', function () {
  describe('get', function () {
    it('should return a non empty JSON with the product', function (done) {
      sails.services.cryptographyservice.decrypt = () => 1
      request(sails.hooks.http.app)
        .get('/api/user/product/get')
        .query({
          id: 1
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) return done(error)

          chai.assert.isNotEmpty(response.body)
          done()
        })
    })
  })
})
