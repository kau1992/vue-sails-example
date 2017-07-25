import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.desktop'
import router from './router/router.desktop'
import store from './../state/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(BootstrapVue)
Vue.use(VueResource)

const i18n = new VueI18n({
  locale: 'en'
})

Vue.http.interceptors.push((request, next) => {
  if (request.url !== '/api/login/post') {
    let token = window.localStorage.getItem('token')
    request.headers.set('token', token)
  }

  next(response => {
    if ((response.status === 404) || (response.status === 504)) {
      router.push({
        name: 'Home'
      })
    }
  })
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.userOnly)) {
    /**
     * @see {@link https://stackoverflow.com/questions/10730362/get-cookie-by-name#answer-40786371}
     * @param name
     * @returns {string}
     */
    const getCookie = name => {
      let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
      return a ? a[1] : ''
    }

    if (getCookie('user')) {
      next()
    } else {
      router.push({
        name: 'Login'
      })
    }
  } else next()
})

const LocaleMixin = {
  computed: {
    locale () {
      return this.$store.state.locale
    }
  },

  watch: {
    locale () {
      this.$i18n.locale = this.locale
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  mixins: [LocaleMixin],
  components: {
    App
  }
})
