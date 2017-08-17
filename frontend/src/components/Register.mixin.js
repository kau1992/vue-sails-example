const RegisterMixin = {
  i18n: {
    messages: {
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
  },

  computed: {
    user: {
      get () {
        return this.$store.state.User.user
      }
    },

    name: {
      get () {
        return this.$store.state.User.user.name
      },

      /**
       * @param name
       */
      set (name) {
        this.$store.commit('SET_USER_NAME', name)
      }
    },

    password: {
      get () {
        return this.$store.state.User.user.password
      },

      /**
       * @param password
       */
      set (password) {
        this.$store.commit('SET_USER_PASSWORD', password)
      }
    }
  },

  methods: {
    create () {
      this.$store.dispatch('postUser', this.user)
    }
  }
}

export default RegisterMixin
