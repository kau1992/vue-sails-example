const AppMixin = {
  name: 'app',

  i18n: {
    messages: {
      en: {
        'home': 'Home',
        'register': 'Register',
        'login': 'Login',
        'shop': 'Shop',
        'basket': 'Basket',
        'products': 'Manage products'

      },
      de: {
        'home': 'Startseite',
        'register': 'Registrierung',
        'login': 'Login',
        'shop': 'Shop',
        'basket': 'Warenkorb',
        'products': 'Produktverwaltung'

      }
    }
  },

  computed: {
    isUserAuthenticated: {
      get () {
        return this.$store.state.isUserAuthenticated
      }
    },

    basket: {
      get () {
        return this.$store.state.Basket.basket
      }
    }
  },

  methods: {

    /**
     * @param language
     */
    setLanguage (language) {
      this.$store.commit('SET_LOCALE', language)
    }
  }
}

export default AppMixin
