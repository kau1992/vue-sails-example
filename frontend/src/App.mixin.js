import {mapMutations} from 'vuex'

const AppMixin = {
  name: 'app',

  i18n: {
    messages: {
      en: {
        'home': 'Home',
        'help': 'Help',
        'register': 'Register',
        'login': 'Login',
        'shop': 'Shop',
        'basket': 'Basket',
        'products': 'Manage products',
        'language.changed': 'Language changed',
        'cancelText': 'Cancel'

      },
      de: {
        'home': 'Startseite',
        'help': 'Hilfe',
        'register': 'Registrierung',
        'login': 'Login',
        'shop': 'Shop',
        'basket': 'Warenkorb',
        'products': 'Produktverwaltung',
        'language.changed': 'Sprache geändert',
        'cancelText': 'Abbrechen'
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
    ...mapMutations({
      setLocale: 'SET_LOCALE'
    })
  }
}

export default AppMixin
