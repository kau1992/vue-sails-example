import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import HomeMixin from '@/components/Home.mixin'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('Home', () => {
  it('should call method to get all products at created hook', () => {
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

    mount(new Vue(), {store, mixins: [HomeMixin]})

    expect(actions.getProducts.calledOnce).to.equal(true)
  })

  it('should call method to get products by page if current page changes', () => {
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

    const wrapper = mount(new Vue(), {
      store,
      mixins: [HomeMixin]
    })

    wrapper.vm.currentPage = 2
    wrapper.vm.$nextTick(() => {
      expect(actions.getProducts.secondCall.args[1]).to.equal(2)
    })
  })
})
