import {mapMutations} from 'vuex'

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
        .then(({token, cookie}) => {
          window.localStorage.setItem('token', token)
          this.setCookie('user', cookie, 3600 * 24 * 7)
          this.setIsUserAuthenticated(true)
          this.$emit('userLoggedIn')

          // Success message

          this.$router.push({
            name: 'Products'
          })
        })
        .catch(() => {
          // Error message
        })
    },

    /**
     * @param {*} name
     * @param {*} value
     * @param {*} seconds
     * @see {@url https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie#answer-33518823}
     */
    setCookie (name, value, seconds) {
      const expires = seconds ? '; expires=' + new Date(new Date().getTime() + seconds * 1000).toGMTString() : ''
      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
    },

    ...mapMutations({
      setIsUserAuthenticated: 'SET_IS_USER_AUTHENTICATED'
    })
  }
}

export default LoginMixin
