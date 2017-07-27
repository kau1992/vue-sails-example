import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import ProductPatchDesktop from '@/components/user/products/product/ProductPatch.desktop'
import faker from 'faker'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('ProductPatch', () => {
  it('should hide modal when cancel button has been clicked', () => {
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
      SET_IS_EDIT_PRODUCT_VISIBLE (state, isEditProductVisible) {
        state.Product.product.meta.isEditProductVisible = isEditProductVisible
      }
    }

    const store = new Vuex.Store({
      state,
      mutations
    })

    ProductPatchDesktop.created = sinon.stub()

    const wrapper = mount(ProductPatchDesktop, {
      store
    })

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(wrapper.vm.$store.state.Product.product.meta.isEditProductVisible).to.equal(false)
  })

  it('should patch product if button has been clicked', () => {
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

    const wrapper = mount(ProductPatchDesktop, {
      store
    })

    const button = wrapper.find('button')[1]
    button.trigger('click')

    expect(actions.patchProduct.calledOnce).to.equal(true)
  })
})
