import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Login from '@/components/Login'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('Login', () => {
  it('should accept inputs', async () => {
    const state = {
      user: {
        name: '',
        password: ''
      }
    }

    const mutations = {
      SET_USER_NAME (state, name) {
        state.user.name = name
      },

      SET_USER_PASSWORD (state, password) {
        state.user.password = password
      }
    }

    const store = new Vuex.Store({
      state,
      mutations
    })

    const wrapper = mount(Login, {
      store
    })

    wrapper.vm.$t = sinon.stub()

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

  it('should call login action if button is clicked', async () => {
    const state = {
      user: {
        name: 'Hans',
        password: '123'
      }
    }

    const actions = {
      loginUser: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      actions
    })

    let login = sinon.stub(Login.methods, 'login')

    const wrapper = mount(Login, {
      store
    })

    wrapper.vm.$t = sinon.stub()

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(login.calledOnce).to.equal(true)
  })
})
