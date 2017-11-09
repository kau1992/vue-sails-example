<template>
  <div>
    <help-index
      v-if="isHelpVisible"
      :io="io"
      @helpMounted="setIo">
    </help-index>

    <b-navbar toggleable type="inverse" variant="primary">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" :to="{ name: 'Home'}">
        <span>Product paradise</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Home'}">{{ $t('home') }}</b-nav-item>
          <b-nav-item v-if="!isUserAuthenticated" :to="{ name: 'Register'}">{{ $t('register') }}</b-nav-item>
          <b-nav-item v-if="!isUserAuthenticated" :to="{ name: 'Login'}">{{ $t('login') }}</b-nav-item>
          <b-nav-item v-if="isUserAuthenticated" :to="{ name: 'Shop'}">{{ $t('shop') }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="setIsHelpVisible(true)">{{ $t('help') }}</b-nav-item>
          <b-nav-item :disabled="!basket.products.length" v-if="isUserAuthenticated" :to="{ name: 'Basket'}">
            {{ $t('basket') }} ({{ basket.products.length }})
          </b-nav-item>
          <b-nav-item v-if="isUserAuthenticated" :to="{ name: 'Products'}">{{ $t('products') }}</b-nav-item>
          <b-nav-item-dropdown text="Language" right-alignment>
            <b-dropdown-item @click="setLocale('en')">English</b-dropdown-item>
            <b-dropdown-item @click="setLocale('de')">Deutsch</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <router-view class="mt-4"></router-view>
    </div>

    <footer class="mt-3 text-center">
      <div class="container">
        <span class="text-muted"><small>This shop is not real and only for demonstration purposes</small></span>
      </div>
    </footer>
  </div>
</template>

<script>
  import * as socketIoClient from 'socket.io-client'
  import * as sailsIo from 'sails.io.js'
  import { mapMutations } from 'vuex'
  import AppMixin from './App.mixin'

  const HelpIndex = () => import('./components/help/Help.desktop')

  export default {
    mixins: [AppMixin],

    components: {
      HelpIndex
    },

    data () {
      return {
        io: null
      }
    },

    computed: {
      isHelpVisible: {
        get () {
          return this.$store.state.isHelpVisible
        },

        /**
         * @param isHelpVisible
         */
        set (isHelpVisible) {
          this.store.commit('SET_IS_HELP_VISIBLE', isHelpVisible)
        }
      }
    },

    watch: {
      isHelpVisible () {
        if (!this.isHelpVisible) this.io.socket.disconnect()
        if (this.isHelpVisible && this.io) this.io.socket.reconnect()
      }
    },

    methods: {
      setIo () {
        if (!this.io) {
          let io = sailsIo(socketIoClient)

          let isProductionEnvironment = (process.env.NODE_ENV === 'production')
          let url

          if (isProductionEnvironment) {
            url = `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`
          } else url = 'http://localhost:1337'

          io.sails.url = url
          io.sails.environment = process.env.NODE_ENV || 'development'
          io.sails.useCORSRouteToGetCookie = false

          this.$set(this, 'io', io)
        }
      },

      ...mapMutations({
        setIsHelpVisible: 'SET_IS_HELP_VISIBLE'
      })
    }
  }
</script>
