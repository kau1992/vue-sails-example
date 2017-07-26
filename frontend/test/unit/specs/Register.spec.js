import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Register from '@/components/Register.desktop'
import faker from 'faker'

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(Vuex)

describe('Register', () => {
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

    const wrapper = mount(Register, {store})

    let name = 'Hans'
    let password = '123'

    let nameInput = wrapper.find('input')[0]
    let passwordInput = wrapper.find('input')[1]

    nameInput.element.value = name
    passwordInput.element.value = password

    nameInput.trigger('input')
    passwordInput.trigger('input')

    expect(wrapper.vm.$store.state.User.user.name).to.equal(name)
    expect(wrapper.vm.$store.state.User.user.password).to.equal(password)
  })

  it('should call create method if button is clicked', async () => {
    const state = {
      User: {
        user: {
          name: faker.name.findName(),
          password: faker.internet.password()
        }
      }
    }

    const actions = {
      create: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      actions
    })

    const wrapper = mount(Register, {store})

    let create = sinon.stub(wrapper.vm, 'create')

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(create.calledOnce).to.equal(true)
  })
})
