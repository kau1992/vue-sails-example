import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import sinonTestFactory from 'sinon-test'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import HomeMixin from '@/components/Home.mixin'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

let sinonTest = sinonTestFactory(sinon)

describe('Home', () => {
  describe('Mixin', () => {
    it('should call method to get all products at created hook', sinonTest(function() {
      const state = {
        Products: {
          products: {
            products: []
          }
        }
      }

      const actions = {
        getProducts: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const vm = new Vue({
        store,
        mixins: [HomeMixin]
      }).$mount()

      expect(actions.getProducts.calledOnce).to.equal(true)
    }))

    it('should call method to get products by page if current page changes', sinonTest(function() {
      const state = {
        Products: {
          products: {
            products: []
          }
        }
      }

      const actions = {
        getProducts: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        actions
      })

      const vm = new Vue({
        store,
        mixins: [HomeMixin]
      }).$mount()

      vm.currentPage = 2
      vm.$nextTick(() => {
        expect(actions.getProducts.secondCall.args[1]).to.equal(2)
      })
    }))
  })
})
