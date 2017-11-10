const ProductsGetMixin = {
  data () {
    return {
      id: ''
    }
  },

  created () {
    this.$store.dispatch('getProductsByUser', this.user)
  },

  i18n: {
    messages: {
      en: {
        'field.first': 'Title',
        'field.second': 'Description',
        'field.third': 'Price',
        'field.fourth': 'Actions',
        'button.first': 'Edit',
        'button.second': 'Remove',
        'product.removed': 'Product removed',
        'p.first': 'No products yet, you should create one.'
      },
      de: {
        'field.first': 'Titel',
        'field.second': 'Beschreibung',
        'field.third': 'Preis',
        'field.fourth': 'Aktionen',
        'button.first': 'Bearbeiten',
        'button.second': 'Entfernen',
        'product.removed': 'Produkt entfernt',
        'p.first': 'Noch keine Produkte, du solltest eines erstellen.'
      }
    }
  },

  computed: {
    fields () {
      return {
        title: {
          label: this.$t('field.first')
        },
        description: {
          label: this.$t('field.second')
        },
        price: {
          label: this.$t('field.third')
        },
        actions: {
          label: this.$t('field.fourth')
        }
      }
    },

    products: {
      get () {
        return this.$store.state.Products.products
      }
    },

    user: {
      get () {
        return this.$store.state.User.user
      }
    },

    isEditProductVisible: {
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

export default ProductsGetMixin
