import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import store from './../../../state/index'
import Login from '@/components/Login'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueI18n)

describe('Home', () => {
  it('should get products at created hook', () => {
    const wrapper = mount(Login)
  })
})
