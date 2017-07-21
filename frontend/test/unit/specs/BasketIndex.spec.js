import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import cloneDeep from 'lodash/cloneDeep'
import BasketIndex from '@/components/user/shop/BasketIndex'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('BasketIndex', () => {
  it('should return correct total price', () => {
    const state = {
      products: {
        products: [{
          price: 99.95
        }, {
          price: 10.00
        }, {
          price: 5.50
        }]
      }
    }
  })
})
