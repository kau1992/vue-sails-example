<template>
  <div>
    <product-patch v-if="isEditProductVisible" v-bind:id="id"></product-patch>

    <b-table :items="products" :fields="fields" v-if="products.length > 0">
      <template slot="price" slot-scope="item">
        ${{ item.item.price }}
      </template>
      <template slot="actions" slot-scope="item">
        <b-button size="sm" variant="outline-primary" @click="showPatchForm(item.item.id)">{{ $t('button.first') }}
        </b-button>
        <b-button size="sm" variant="outline-warning" @click="deleteProduct(item.item.id)">{{ $t('button.second') }}</b-button>
      </template>
    </b-table>

    <p v-else>{{ $t('p.first') }}</p>
  </div>
</template>

<script>
  import ProductsGetMixin from './ProductsGet.mixin'
  import ProductPatch from './product/ProductPatch.desktop'

  export default {
    mixins: [ProductsGetMixin],

    components: {
      ProductPatch
    },

    methods: {
      /**
       * @productId
       */
      showPatchForm (id) {
        this.$set(this, 'id', id)
        this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', true)
      },

      /**
       * @param id
       */
      deleteProduct (id) {
        this.$store.dispatch('deleteProduct', id)
          .then(() => {
            this.$store.dispatch('getProductsByUser', this.user)
          })
          .catch(error => {
            // Error message
          })
      }
    }
  }
</script>
