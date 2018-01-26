export default {
  i18n: {
    messages: {
      en: {
        'description.first': 'Define a title',
        'label.first': 'Title',
        'description.second': 'Define a price',
        'label.second': 'Price',
        'description.third': 'Define a description',
        'label.third': 'Description',
        'button.first': 'Create',
        'product.created': 'Product created'
      },

      de: {
        'description.first': 'Definiere einen Titel',
        'label.first': 'Titel',
        'description.second': 'Definiere einen Preis',
        'label.second': 'Preis',
        'description.third': 'Definiere eine Beschreibung',
        'label.third': 'Beschreibung',
        'button.first': 'Erstellen',
        'product.created': 'Produkt erstellt'
      }
    }
  },

  created () {
    this.$store.commit('RESET_PRODUCT')
  },

  computed: {
    product: {
      get () {
        return this.$store.state.Product.product
      }
    },

    user: {
      get () {
        return this.$store.state.User.user
      }
    },

    title: {
      get () {
        return this.$store.state.Product.product.title
      },

      set (title) {
        this.$store.commit('SET_PRODUCT_TITLE', title)
      }
    },

    description: {
      get () {
        return this.$store.state.Product.product.description
      },

      set (description) {
        this.$store.commit('SET_PRODUCT_DESCRIPTION', description)
      }
    },

    price: {
      get () {
        return this.$store.state.Product.product.price
      },

      set (price) {
        this.$store.commit('SET_PRODUCT_PRICE', price)
      }
    }
  }
}
