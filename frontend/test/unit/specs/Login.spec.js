import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Login from '@/components/Login.desktop'
import faker from 'faker'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('Login', () => {
  it('should accept inputs', async () => {
    const state = {
      User: {
        user: {
          name: '',
          password: ''
        }
      }
    }

    const mutations = {
      SET_USER_NAME (state, name) {
        state.User.user.name = name
      },

      SET_USER_PASSWORD (state, password) {
        state.User.user.password = password
      }
    }

    const store = new Vuex.Store({
      state,
      mutations
    })

    const wrapper = mount(Login, {
      store
    })

    let name = faker.name.firstName()
    let password = faker.internet.password()

    let nameInput = wrapper.find('input')[0]
    let passwordInput = wrapper.find('input')[1]

    nameInput.element.value = name
    passwordInput.element.value = password

    nameInput.trigger('input')
    passwordInput.trigger('input')

    expect(wrapper.vm.$store.state.User.user.name).to.equal(name)
    expect(wrapper.vm.$store.state.User.user.password).to.equal(password)
  })

  it('should call login action if button is clicked', () => {
    const state = {
      User: {
        user: {
          name: 'Hans',
          password: '123'
        }
      }
    }

    const actions = {
      loginUser: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      actions
    })

    const wrapper = mount(Login, {
      store
    })

    let login = sinon.stub(wrapper.vm, 'login')

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(login.calledOnce).to.equal(true)
  })
})
