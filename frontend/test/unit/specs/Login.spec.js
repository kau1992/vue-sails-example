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

describe('Login', () => {
  it('should accept inputs', () => {
    store.locale = 'en'
    const wrapper = mount(Login, {
      store
    })

    let name = 'Hans'
    let password = '123'

    let nameInput = wrapper.find('input')[0]
    let passwordInput = wrapper.find('input')[1]

    nameInput.element.value = name
    passwordInput.element.value = password

    nameInput.trigger('input')
    passwordInput.trigger('input')

    expect(wrapper.vm.$store.state.user.name).to.equal(name)
    expect(wrapper.vm.$store.state.user.password).to.equal(password)
  })

  it('should call vuex action if button is clicked', () => {
    const actions = {
      loginUser: sinon.stub()
    }
    const store = new Vuex.Store({
      state: {
        locale: 'en',
        user: {
          name: 'Hans',
          password: '123'
        }
      },
      actions
    })

    const wrapper = mount(Login, {
      store
    })
    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(actions.loginUser.calledOnce).to.equal(true)
  })
})
