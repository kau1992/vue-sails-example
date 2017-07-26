<template>
  <div id="app">
    <mt-header title="Product paradise">
      <router-link :to="{ name: 'Home'}" slot="left">
        <mt-button>Home</mt-button>
      </router-link>
      <span slot="right">
        <mt-button icon="more" @click.native="isNavbarVisible = true"></mt-button>
        </span>
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
  import AppMixin from './App.mixin'
  import {
    Toast
  } from 'mint-ui'

  export default {
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
          name: 'Basket',
          method: () => {
            this.$router.push({
              name: 'Basket'
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

      actions.push({
        name: 'Change language',
        method: () => {
          let locale = this.$store.state.locale

          if (locale === 'en') this.setLanguage('de')
          if (locale === 'de') this.setLanguage('en')

          Toast({
            message: 'Language changed',
            position: 'bottom',
            duration: 3000
          })
        }
      })

      this.$set(this, 'actions', actions)
    },
    mixins: [AppMixin]
  }
</script>

<style>
  body {
    margin: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  }
</style>
