import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount,
  shallow
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import ProductsGet from '@/components/user/products/ProductsGet'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('ProductsGet', () => {
  it('should call method to get all products by user at created hook', async () => {
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

    wrapper.vm.$t = sinon.stub()

    expect(actions.getProductsByUser.calledOnce).to.equal(true)
  })

  it('should show product patch modal when button is clicked', () => {
    const state = {
      product: {
        meta: {
          isEditProductVisible: false
        }
      },
      products: [{
        id: 1
      }]
    }

    const actions = {
      getProduct: sinon.stub(),
      getProductsByUser: sinon.stub()
    }

    const mutations = {
      SET_IS_EDIT_PRODUCT_VISIBLE (state, isEditProductVisible) {
        state.product.meta.isEditProductVisible = isEditProductVisible
      }
    }

    const store = new Vuex.Store({
      state,
      actions,
      mutations,
    })

    const wrapper = shallow(ProductsGet, {
      store
    })

    wrapper.vm.$t = sinon.stub()

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(wrapper.vm.$store.state.product.meta.isEditProductVisible).to.equal(true)
  })
})
