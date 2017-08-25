import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import sinonTestFactory from 'sinon-test'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import ProductsGetDesktop from '@/components/user/products/ProductsGet.desktop'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

let sinonTest = sinonTestFactory(sinon)

describe('ProductsGet', () => {
    describe('Desktop', () => {
    it('should show product patch modal when button is clicked', sinonTest(function() {
      const state = {
        User: {
          user: {
            id: '',
            name: '',
            password: ''
          }
        },
        Product: {
          product: {
            meta: {
              isEditProductVisible: false
            }
          }
        },
        Products: {
          products: [{
            id: 1
          }]
        }
      }

      const actions = {
        getProduct: sinon.stub(),
        getProductsByUser: sinon.stub()
      }

      const mutations = {
        SET_IS_EDIT_PRODUCT_VISIBLE(state, isEditProductVisible) {
          state.Product.product.meta.isEditProductVisible = isEditProductVisible
        }
      }

      const store = new Vuex.Store({
        state,
        actions,
        mutations,
      })

      ProductsGetDesktop.components = sinon.stub()

      const Ctor = Vue.extend(ProductsGetDesktop)
      const vm = new Ctor({
        store
      }).$mount()

      const button = vm.$el.querySelectorAll('button')[0]
      button.click()

      expect(vm.$store.state.Product.product.meta.isEditProductVisible).to.equal(true)
    }))
  })
})
