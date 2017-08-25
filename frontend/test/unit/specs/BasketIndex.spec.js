import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import sinonTestFactory from 'sinon-test'
import BootstrapVue from 'bootstrap-vue'
import faker from 'faker'
import VueI18n from 'vue-i18n'
import toFinite from 'lodash/toFinite'
import BasketIndexMixin from '@/components/user/shop/BasketIndex.mixin'
import BasketIndexDesktop from '@/components/user/shop/BasketIndex.desktop'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

let sinonTest = sinonTestFactory(sinon)

describe('BasketIndex', () => {
  describe('Mixin', () => {
    it('should return correct total price', sinonTest(function() {
      const firstPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))
      const secondPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))
      const thirdPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))

      const state = {
        Basket: {
          basket: {
            products: [{
              price: firstPrice
            }, {
              price: secondPrice
            }, {
              price: thirdPrice
            }]
          }
        }
      }

      const store = new Vuex.Store({
        state
      })

      const vm = new Vue({
        store,
        mixins: [BasketIndexMixin]
      }).$mount()

      assert.equal(vm.totalPrice, firstPrice + secondPrice + thirdPrice)
    }))
  })

  describe('Desktop', () => {
    it('should call vuex action if button has been clicked', sinonTest(async function() {
      const firstPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))
      const secondPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))
      const thirdPrice = toFinite(faker.random.number({
        min: 1,
        max: 1000
      }))

      const state = {
        Basket: {
          basket: {
            products: [{
              price: firstPrice
            }, {
              price: secondPrice
            }, {
              price: thirdPrice
            }]
          }
        }
      }

      const actions = {
        checkout: sinon.stub().resolves()
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const Ctor = Vue.extend(BasketIndexDesktop)
      const vm = new Ctor({
        store
      }).$mount()

      const button = vm.$el.querySelectorAll('button')[3]
      button.click()

      expect(actions.checkout.calledOnce).to.equal(true)
    }))
  })
})
