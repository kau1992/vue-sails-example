<template>
  <div>
  <mt-cell v-for="product in products" :key="product.id" :title="product.title">
    <mt-button size="small" @click="makeProductVisible(product)">View</mt-button>
  </mt-cell>

  <mt-cell title="">
    <mt-button :disabled="isNextButtonDisabled" size="small" type="primary" @click="currentPage++">Next</mt-button>
  </mt-cell>
</div>
</template>

<script>
import ShopIndexMixin from './ShopIndex.mixin'
import {
  Toast,
  MessageBox
} from 'mint-ui'

export default {
  mixins: [ShopIndexMixin],

  computed: {
    isNextButtonDisabled () {
      if (this.currentPage === Math.ceil(this.amountOfProducts / 6)) return true
      return false
    }
  },

  methods: {

    /**
     * @param product
     */
    makeProductVisible (product) {
      MessageBox({
        title: product.title,
        message: product.description,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: `Buy for $${product.price}`
      }, action => {
        if (action === 'confirm') {
          this.pushToBasket(product)
          Toast({
            message: 'Product added to basket',
            position: 'bottom',
            duration: 3000
          })
        }
      })
    }
  }
}
</script>
