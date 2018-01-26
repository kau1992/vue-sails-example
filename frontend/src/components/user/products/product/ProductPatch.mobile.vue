<template>
  <div>
    <mt-popup v-model="isEditProductVisible" class="mint-popup-1">
      <mt-field :label="$t('label.first')" v-model="title"></mt-field>
      <mt-field :label="$t('label.third')" v-model="description"></mt-field>
      <mt-field :label="$t('label.second')" v-model="price"></mt-field>

      <mt-cell title="">
        <mt-button size="small" type="default" @click="cancel" plain>{{ $t('button.first') }}</mt-button> <mt-button size="small" type="primary" @click="patchProduct" plain>{{ $t('button.second') }}</mt-button>
      </mt-cell>
    </mt-popup>
</div>
</template>

<script>
  import ProductPatchMixin from './ProductPatch.mixin'
  import {
    Toast
  } from 'mint-ui'

  export default {
    mixins: [ProductPatchMixin],

    created () {
      this.$store.dispatch('getProduct', this.id)
        .then(product => {
          this.$store.commit('SET_PRODUCT_TITLE', product.title)
          this.$store.commit('SET_PRODUCT_DESCRIPTION', product.description)
          this.$store.commit('SET_PRODUCT_PRICE', product.price)
        }, () => {
          // Error message
        })
    },

    methods: {
      async patchProduct () {
        await this.$store.dispatch('patchProduct', {
          id: this.id,
          title: this.title,
          price: this.price,
          description: this.description
        })

        Toast({
          message: this.$t('product.patched'),
          position: 'bottom',
          duration: 3000
        })

        this.$store.dispatch('getProductsByUser', this.user)
        this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', false)
        this.$store.commit('RESET_PRODUCT')
      },

      cancel () {
        this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', false)
      }
    },

    destroyed () {
      this.$store.commit('RESET_PRODUCT')
    }
  }
</script>

<style>
.mint-popup-1 {
  width: 85%;
  height: 85%;
  border-radius: 8px;
  padding: 20px;
}
</style>
