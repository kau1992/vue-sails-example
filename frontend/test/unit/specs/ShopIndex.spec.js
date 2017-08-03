import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import sinonTestFactory from 'sinon-test'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import ShopIndexMixin from '@/components/user/shop/ShopIndex.mixin'
import ShopIndexDesktop from '@/components/user/shop/ShopIndex.desktop'
import faker from 'faker'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

let sinonTest = sinonTestFactory(sinon)

describe('ShopIndex', () => {
  describe('Mixin', () => {
    it('should call method to get product by page if current page changes', sinonTest(function (done) {
      const state = {
        Products: {
          products: {
            products: []
          }
        }
      }

      const actions = {
        getShopProducts: sinon.stub(),
        getUser () {
          return new Promise(resolve => resolve())
        }
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const vm = new Vue({
        store,
        mixins: [ShopIndexMixin]
      }).$mount()

      vm.currentPage = 2
      vm.$nextTick(() => {
        try {
          expect(actions.getShopProducts.firstCall.args[1]).to.equal(2)
          done()
        } catch (error) {
          done(error)
        }
      })
    }))

    it('should call method to get user at created hook', sinonTest(function () {
      const name = faker.name.findName()

      const state = {
        User: {
          user: {
            name
          }
        },
        Products: {
          products: {
            products: [{
              user: {
                name
              }
            }]
          }
        }
      }

      const actions = {
        getShopProducts: sinon.stub(),
        getUser: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      new Vue({
        store,
        mixins: [ShopIndexMixin]
      }).$mount()

      expect(actions.getUser.calledOnce).to.equal(true)
    }))

    it('should have initial current page set to 1', sinonTest(function () {
      const state = {
        User: {
          user: {
            name: ''
          }
        },
        Products: {
          products: {
            products: []
          }
        }
      }

      const actions = {
        getShopProducts: sinon.stub(),
        getUser: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const vm = new Vue({
        store,
        mixins: [ShopIndexMixin]
      }).$mount()

      expect(vm.currentPage).to.equal(1)
    }))

    it('should call method to get shop products at created hook', sinonTest(async function () {
      const state = {
        Products: {
          products: {
            products: []
          }
        }
      }

      const actions = {
        getShopProducts: sinon.stub(),
        getUser () {
          return new Promise(resolve => resolve())
        }
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const vm = new Vue({
        store,
        mixins: [ShopIndexMixin]
      }).$mount()

      await new Promise((resolve, _) => vm.$nextTick(resolve))
      expect(actions.getShopProducts.calledOnce).to.equal(true)
    }))
  })

  describe('Desktop', () => {
    it('should push to basket if button has been clicked', sinonTest(async function () {
      const name = faker.name.findName()

      const state = {
        Basket: {
          basket: {
            products: []
          }
        },
        Products: {
          products: {
            products: [{
              user: {
                name
              }
            }]
          }
        },
        User: {
          user: {
            name
          }
        }
      }

      const actions = {
        getShopProducts: sinon.stub(),
        getUser: sinon.stub()
      }

      const mutations = {
        PUSH_TO_BASKET: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        mutations,
        actions
      })

      const vm = new Vue({
        store,
        template: '<div><test></test</div>',
        components: {
          'test': ShopIndexDesktop
        },
        mixins: [ShopIndexMixin]
      }).$mount()

      const button = vm.$el.querySelector('button')
      button.dispatchEvent(new window.Event('click'))
      vm._watcher.run()

      expect(mutations.PUSH_TO_BASKET.calledOnce).to.equal(true)
    }))
  })
})
