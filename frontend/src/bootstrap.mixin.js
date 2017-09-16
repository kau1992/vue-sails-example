import Vue from 'vue'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import store from './../state/index'

Vue.use(VueI18n)
Vue.use(VueResource)

const i18n = new VueI18n({
  locale: 'en'
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

export { Vue, store, i18n, LocaleMixin }
