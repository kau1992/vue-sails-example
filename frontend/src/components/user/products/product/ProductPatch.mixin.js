const ProductPatchMixin = {
  props: ['id'],

  i18n: {
    messages: {
      en: {
        'template.first.title': 'Patch product',
        'description.first': 'Define a title',
        'label.first': 'Title',
        'description.second': 'Define a price',
        'label.second': 'Price',
        'description.third': 'Define a description',
        'label.third': 'Description',
        'button.first': 'Cancel',
        'button.second': 'Patch',
        'product.patched': 'Product patched'
      },
      de: {
        'template.first.title': 'Bearbeite Produkt',
        'description.first': 'Definiere einen Titel',
        'label.first': 'Titel',
        'description.second': 'Definiere einen Preis',
        'label.second': 'Preis',
        'description.third': 'Definiere eine Beschreibung',
        'label.third': 'Beschreibung',
        'button.first': 'Abbrechen',
        'button.second': 'Speichern',
        'product.patched': 'Produkt bearbeitet'
      }
    }
  },

  computed: {
    user: {
      /**
       * @returns {user|{name, password}|{id, name, password}|{name}}
       */
      get () {
        return this.$store.state.User.user
      }
    },

    title: {
      /**
       * @returns {*}
       */
      get () {
        return this.$store.state.Product.product.title
      },

      /**
       * @param title
       */
      set (title) {
        this.$store.commit('SET_PRODUCT_TITLE', title)
      }
    },

    description: {
      /**
       * @returns {*}
       */
      get () {
        return this.$store.state.Product.product.description
      },

      /**
       * @param description
       */
      set (description) {
        this.$store.commit('SET_PRODUCT_DESCRIPTION', description)
      }
    },

    price: {
      /**
       * @returns {*}
       */
      get () {
        return this.$store.state.Product.product.price
      },

      /**
       * @param price
       */
      set (price) {
        this.$store.commit('SET_PRODUCT_PRICE', price)
      }
    },

    isEditProductVisible: {
      /**
       * @returns {boolean}
       */
      get () {
        return this.$store.state.Product.product.meta.isEditProductVisible
      },

      /**
       * @param isEditProductVisible
       */
      set (isEditProductVisible) {
        this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', isEditProductVisible)
      }
    }
  }
}

export default ProductPatchMixin
