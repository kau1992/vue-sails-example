import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import BootstrapVue from 'bootstrap-vue'
import faker from 'faker'
import VueI18n from 'vue-i18n'
import toFinite from 'lodash/toFinite'
import BasketIndex from '@/components/user/shop/BasketIndex.desktop'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('BasketIndex', () => {
  it('should return correct total price', () => {
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

    const wrapper = mount(BasketIndex, {
      store
    })

    assert.equal(wrapper.vm.totalPrice, firstPrice + secondPrice + thirdPrice)
  })
})
