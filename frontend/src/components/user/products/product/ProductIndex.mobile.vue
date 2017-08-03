<template>
  <div>
  <mt-navbar v-model="currentTab">
    <mt-tab-item id="getProducts">{{ $t('tab.first') }}</mt-tab-item>
    <mt-tab-item id="createProducts">{{ $t('tab.second') }}</mt-tab-item>
  </mt-navbar>

  <mt-tab-container v-model="currentTab">
  <mt-tab-container-item id="getProducts">
    <products-get></products-get>
  </mt-tab-container-item>
  <mt-tab-container-item id="createProducts">
    <product-create></product-create>
  </mt-tab-container-item>
</mt-tab-container>
</div>
</template>

<script>
  import ProductIndexMixin from './ProductIndex.mixin'

  export default {
    mixins: [ProductIndexMixin],

    components: {
      ProductCreate: () => import('./ProductCreate.mobile'),
      ProductsGet: () => import('../ProductsGet.mobile')
    },

    data () {
      return {
        currentTab: 'getProducts'
      }
    }
  }
</script>
