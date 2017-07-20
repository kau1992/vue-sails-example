import Vue from 'vue'
import Vuex from 'vuex'
import {
  mount
} from 'avoriaz'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Register from '@/components/Register'

Vue.use(BootstrapVue)
Vue.use(VueI18n)

describe('Register', () => {
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

    const messages = {
      en: {
        'description.first': 'Enter a name',
        'label.first': 'Name *',
        'description.second': 'Enter a password',
        'label.second': 'Password *',
        'button.first': 'Create'
      },
      de: {
        'description.first': 'Gebe einen Namen ein',
        'label.first': 'Name *',
        'description.second': 'Gebe ein Passwort ein',
        'label.second': 'Passwort *',
        'figcaption.first': 'Du kannst einen dieser Nutzer wählen, um dich einzuloggen.',
        'button.first': 'Erstellen'
      }
    }

    const i18n = new VueI18n({
      locale: 'en',
      messages
    })

    const wrapper = mount(Register, {
      store,
      i18n
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

  it('should call create method if button is clicked', async () => {
    const state = {
      user: {
        name: 'Hans',
        password: '123'
      }
    }

    const actions = {
      create: sinon.stub()
    }

    const store = new Vuex.Store({
      state,
      actions
    })

    let create = sinon.stub(Register.methods, 'create')

    const wrapper = mount(Register, {
      store
    })

    const button = wrapper.find('button')[0]
    button.trigger('click')

    expect(create.calledOnce).to.equal(true)
  })
})
