<template>
<div id="app">
  <mt-header title="Product paradise">
    <router-link :to="{ name: 'Home'}" slot="left">
      <mt-button>Home</mt-button>
    </router-link>
    <mt-button icon="more" slot="right" @click.native="isNavbarVisible = true">
    </mt-button>
  </mt-header>

  <router-view></router-view>

  <mt-actionsheet
  cancelText="Cancel"
  size="large"
  :actions="actions"
  v-model="isNavbarVisible">
</mt-actionsheet>
</div>
</template>

<script>
export default {
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

  data () {
    return {
      actions: [],
      isNavbarVisible: false
    }
  },

  mounted () {
    let actions = []

    if (!this.isUserAuthenticated) {
      actions.push({
        name: 'Register',
        method: () => {
          this.$router.push({
            name: 'Register'
          })
        }
      })

      actions.push({
        name: 'Login',
        method: () => {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    } else {
      actions.push({
        name: 'Shop',
        method: () => {
          this.$router.push({
            name: 'Shop'
          })
        }
      })

      actions.push({
        name: 'Products',
        method: () => {
          this.$router.push({
            name: 'Products'
          })
        }
      })
    }

    this.$set(this, 'actions', actions)
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
</script>

<style>
body {
  margin: 0;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}

button {
   padding: 0 15px 15px;
}
</style>
