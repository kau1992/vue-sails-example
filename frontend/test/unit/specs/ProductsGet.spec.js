import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import ProductsGet from '@/components/user/products/ProductsGet'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueResource)

describe('ProductsGet', () => {
  it('should call method to get all products by user at created hook', async() => {
    const state = {
      product: {
        meta: sinon.stub()
      },
      products: {
        products: []
      }
    }

    const actions = {
      getProductsByUser: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      actions
    })

    const wrapper = mount(ProductsGet, {
      store
    })

    expect(actions.getProductsByUser.calledOnce).to.equal(true)
  })

  it('should show product patch modal when button is clicked', async() => {
    const state = {
      product: {
        meta: {
          isEditProductVisible: false
        }
      },
      products:[{
          id: 1
        }]
    }

    const actions = {
      getProductsByUser: sinon.stub()
    }

    const mutations = {
      SET_IS_EDIT_PRODUCT_VISIBLE (state, isEditProductVisible) {
        state.product.meta.isEditProductVisible = isEditProductVisible
      }
    }

    const store = new Vuex.Store({
      state,
      mutations,
      actions
    })

    const wrapper = mount(ProductsGet, {
      store
    })

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(wrapper.vm.$store.state.product.meta.isEditProductVisible).to.equal(true)
  })
})