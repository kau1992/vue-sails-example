const request = require('supertest')
const chai = require('chai')
const faker = require('faker')

describe('Products', function() {

  describe('get', function() {
    it('should return a non empty JSON with products', function(done) {
      request(sails.hooks.http.app)
        .get('/api/products/get')
        .query({
          page: 1
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) return done(error)

          chai.assert.isNotEmpty(response.body.products)
          done()
        })
    })
  })
})
