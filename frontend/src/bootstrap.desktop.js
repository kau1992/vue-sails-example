import { Vue, store, i18n, LocaleMixin } from './bootstrap.mixin'
import App from './App.desktop'
import router from './router/router.desktop'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.http.interceptors.push((request, next) => {
  if (request.url !== '/api/login/post') {
    let token = window.localStorage.getItem('token')
    request.headers.set('token', token)
  }

  next(response => {
    if ((response.status === 404) || (response.status === 504)) {
      router.push({name: 'Home'})
    }

    if (response.status === 403) router.push({name: 'Login'})
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
    } else router.push({name: 'Login'})
  } else next()
})

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
