import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import sinonTestFactory from 'sinon-test'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import ProductPatchMixin from '@/components/user/products/product/ProductPatch.mixin'
import ProductPatchDesktop from '@/components/user/products/product/ProductPatch.desktop'
import faker from 'faker'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

let sinonTest = sinonTestFactory(sinon)

describe('ProductPatch', () => {
  describe('Desktop', () => {
    it('should hide modal when cancel button has been clicked', sinonTest(function() {
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
            title: faker.commerce.product(),
            description: faker.lorem.sentences(),
            price: faker.finance.amount(),
            meta: {
              isEditProductVisible: true
            }
          }
        }
      }

      const mutations = {
        SET_IS_EDIT_PRODUCT_VISIBLE(state, isEditProductVisible) {
          state.Product.product.meta.isEditProductVisible = isEditProductVisible
        }
      }

      const store = new Vuex.Store({
        state,
        mutations
      })

      ProductPatchDesktop.created = sinon.stub()

      const Ctor = Vue.extend(ProductPatchDesktop)
      const vm = new Ctor({
        store
      }).$mount()

      const button = vm.$el.querySelector('button')
      button.click()

      expect(vm.$store.state.Product.product.meta.isEditProductVisible).to.equal(false)
    }))


    it('should patch product if button has been clicked', sinonTest(function() {
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
            title: faker.commerce.product(),
            description: faker.lorem.sentences(),
            price: faker.finance.amount(),
            meta: {
              isEditProductVisible: true
            }
          }
        }
      }

      const actions = {
        patchProduct: sinon.stub(),
        getProductsByUser: sinon.stub()
      }

      const mutations = {
        SET_IS_EDIT_PRODUCT_VISIBLE: sinon.stub(),
        RESET_PRODUCT: sinon.stub()
      }

      const store = new Vuex.Store({
        state,
        mutations,
        actions
      })

      ProductPatchDesktop.created = sinon.stub()

      const Ctor = Vue.extend(ProductPatchDesktop)
      const vm = new Ctor({
        store
      }).$mount()

      const button = vm.$el.querySelectorAll('button')[1]
      button.click()

      expect(actions.patchProduct.calledOnce).to.equal(true)
    }))
  })
})
