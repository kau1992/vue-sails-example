<template>
  <div id="app">
    <mt-header title="Product paradise">
      <router-link :to="{ name: 'Home'}" slot="left">
        <mt-button>{{ $t('home')}}</mt-button>
      </router-link>
      <span slot="right">
        <mt-button icon="more" @click.native="isNavbarVisible = true"></mt-button>
        </span>
    </mt-header>

    <router-view @userLoggedIn="setActions"></router-view>

    <mt-actionsheet
      :cancelText="$t('cancelText')"
      size="large"
      :actions="actions"
      v-model="isNavbarVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import AppMixin from './App.mixin'
  import {
    Toast
  } from 'mint-ui'

  export default {
    mixins: [AppMixin],

    data () {
      return {
        actions: [],
        isNavbarVisible: false
      }
    },

    mounted () {
      this.setActions()
    },

    methods: {
      setActions () {
        let actions = []

        if (!this.isUserAuthenticated) {
          actions.push({
            name: this.$t('register'),
            method: () => {
              this.$router.push({
                name: 'Register'
              })
            }
          })

          actions.push({
            name: this.$t('login'),
            method: () => {
              this.$router.push({
                name: 'Login'
              })
            }
          })
        } else {
          actions.push({
            name: this.$t('shop'),
            method: () => {
              this.$router.push({
                name: 'Shop'
              })
            }
          })

          actions.push({
            name: this.$t('basket'),
            method: () => {
              this.$router.push({
                name: 'Basket'
              })
            }
          })

          actions.push({
            name: this.$t('products'),
            method: () => {
              this.$router.push({
                name: 'Products'
              })
            }
          })
        }

        actions.push({
          name: 'Change language',
          method: () => {
            let locale = this.$store.state.locale

            if (locale === 'en') this.setLocale('de')
            if (locale === 'de') this.setLocale('en')

            Toast({
              message: this.$t('language.changed'),
              position: 'bottom',
              duration: 3000
            })

            this.$nextTick(() => {
              this.setActions()
            })
          }
        })

        this.$set(this, 'actions', actions)
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  }

  button {
    margin-left: 5px !important;
  }
</style>
