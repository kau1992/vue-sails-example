<template>
<div>
  <mt-swipe :show-indicators="false">
        <mt-swipe-item class="slide1">
         {{ $t('p.first') }}
        </mt-swipe-item>
        <mt-swipe-item class="slide2">
          {{ $t('p.second') }}
        </mt-swipe-item>
        <mt-swipe-item class="slide3">
          {{ $t('p.third') }}
        </mt-swipe-item>
      </mt-swipe>

  <mt-cell v-for="product in products" :key="product.id" :title="product.title">
    <mt-button size="small" @click="makeProductVisible(product)">View</mt-button>
  </mt-cell>
</div>
</template>

<script>
import HomeMixin from './Home.mixin'
import {
  MessageBox
} from 'mint-ui'

export default {
  mixins: [HomeMixin],

  methods: {
    makeProductVisible (product) {
      MessageBox({
        title: product.title,
        message: product.description,
        confirmButtonText: 'Okay'
      })
    }
  }
}
</script>

<style>
.mint-swipe {
    height: 100px;
    text-align: center;
  }
  .mint-swipe-item {
    color: #000;
    line-height: 100px;
  }
  .slide1 {

  }
  .slide2 {

  }
  .slide3 {

  }
</style>
