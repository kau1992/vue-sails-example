const request = require('supertest')
const chai = require('chai')
const faker = require('faker')

describe('Login', function() {
  it('should send a non empty JSON response', function(done) {
    request(sails.hooks.http.app)
      .post('/api/login/post')
      .send({
        name: 'Joe',
        password: 'toasty'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, response) => {
        if (error) return done(error)

        chai.assert.isNotEmpty(response.body.token)
        done()
      })
  })

  it('should deny access', function(done) {
    request(sails.hooks.http.app)
      .post('/api/login/post')
      .send({
        name: faker.name.findName(),
        password: faker.internet.password()
      })
      .expect(403, done)
  })
})
