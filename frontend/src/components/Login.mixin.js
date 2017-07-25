const LoginMixin = {
  i18n: {
    messages: {
      en: {
        'description.first': 'Enter your name',
        'label.first': 'Name',
        'description.second': 'Enter your password',
        'label.second': 'Password',
        'figcaption.first': 'You may choose one of these users to login.',
        'button.first': 'Submit'
      },
      de: {
        'description.first': 'Gebe deinen Namen ein',
        'label.first': 'Name',
        'description.second': 'Gebe dein Passwort ein',
        'label.second': 'Passwort',
        'figcaption.first': 'Du kannst einen dieser Nutzer wählen, um dich einzuloggen.',
        'button.first': 'Senden'
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
    login () {
      this.$store.dispatch('loginUser', this.user)
        .then(token => {
          window.localStorage.setItem('token', token.token)

          // Success message

          this.$router.push({
            name: 'Products'
          })
        })
        .catch(() => {
          // Error message
        })
    }
  }
}

export default LoginMixin
