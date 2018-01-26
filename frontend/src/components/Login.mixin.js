import {mapMutations} from 'vuex'

export default {
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

      set (name) {
        this.$store.commit('SET_USER_NAME', name)
      }
    },

    password: {
      get () {
        return this.$store.state.User.user.password
      },

      set (password) {
        this.$store.commit('SET_USER_PASSWORD', password)
      }
    }
  },

  methods: {
    async login () {
      let {token, cookie} = await this.$store.dispatch('loginUser', this.user)

      window.localStorage.setItem('token', token)
      this.setCookie('user', cookie, 3600 * 24 * 7)
      this.setIsUserAuthenticated(true)
      this.$emit('userLoggedIn')

      this.$router.push({name: 'Products'})
    },

    setCookie (name, value, seconds) {
      const expires = seconds ? '; expires=' + new Date(new Date().getTime() + seconds * 1000).toGMTString() : ''
      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
    },

    ...mapMutations({
      setIsUserAuthenticated: 'SET_IS_USER_AUTHENTICATED'
    })
  }
}
