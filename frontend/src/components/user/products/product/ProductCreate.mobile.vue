<template>
  <div>
    <mt-field :label="$t('label.first')" v-model="title"></mt-field>
    <mt-field :label="$t('label.third')" v-model="description"></mt-field>
    <mt-field :label="$t('label.second')" v-model="price"></mt-field>

    <mt-cell title="">
          <mt-button size="small" type="primary" @click="create" plain>{{ $t('button.first') }}</mt-button>
    </mt-cell>
  </div>
</template>

<script>
  import ProductCreateMixin from './ProductCreate.mixin'
  import {
    Toast
  } from 'mint-ui'

  export default {
    mixins: [ProductCreateMixin],

    methods: {
      create () {
        this.$store.dispatch('postProduct', {
          product: this.product,
          user: this.user
        })
          .then(() => {
            Toast({
              message: this.$t('product.created'),
              position: 'bottom',
              duration: 3000
            })

            this.$store.dispatch('getProductsByUser', this.user)
          }, () => {
            // Error message
          })
      }
    }
  }
</script>
