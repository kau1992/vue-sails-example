import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import ShopIndex from '@/components/user/shop/ShopIndex'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('ShopIndex', () => {

  it('should call method to get user at created hook', () => {
    const state = {
      user: {
        name: 'a'
      },
      products: {
        products: [{
          user: {
            name: 'a'
          }
        }]
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

    const wrapper = mount(ShopIndex, {
      store
    })

    wrapper.vm.$t = sinon.stub()

    expect(actions.getUser.calledOnce).to.equal(true)
  })

  it('should call method to get shop products at created hook', async () => {
    const state = {
      products: {
        products: []
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

    const wrapper = mount(ShopIndex, {
      store
    })

    await new Promise((resolve, _) => wrapper.vm.$nextTick(resolve))
    expect(actions.getShopProducts.calledOnce).to.equal(true)
  })

  it('should call the push to basket method if button is clicked', () => {
    const state = {
      user: {
        name: 'a'
      },
      products: {
        products: [{
          user: {
            name: 'b'
          }
        }]
      }
    }

    const mutations = {
      PUSH_TO_BASKET: sinon.stub()
    }

    const actions = {
      getShopProducts: sinon.stub(),
      getUser () {
        return {
          name: 'a'
        }
      }
    }

    const store = new Vuex.Store({
      state,
      actions,
      mutations
    })

    let mockShopIndex = cloneDeep(ShopIndex)
    mockShopIndex.create = sinon.stub()

    const wrapper = mount(mockShopIndex, {store})
    wrapper.vm.$t = sinon.stub()

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(mutations.PUSH_TO_BASKET.calledOnce).to.equal(true)
  })

  it('should have initial current page set to 1', () => {
    const state = {
      user: {
        name: ''
      },
      products: {
        products: []
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

    let mockShopIndex = cloneDeep(ShopIndex)
    mockShopIndex.create = sinon.stub()

    const wrapper = mount(mockShopIndex, {store})
    wrapper.vm.$t = sinon.stub()

    expect(wrapper.vm.currentPage).to.equal(1)
  })

  it('should call method to get product by page if current page changes', (done) => {
    const state = {
      products: {
        products: []
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

    let mockShopIndex = cloneDeep(ShopIndex)
    mockShopIndex.create = sinon.stub()

    const wrapper = mount(mockShopIndex, {
      store
    })

    wrapper.vm.currentPage = 2
    wrapper.vm.$nextTick(() => {
      try {
        expect(actions.getShopProducts.firstCall.args[1]).to.equal(2)
        done()
      } catch (error) {
        done(error)
      }
    })
  })
})
