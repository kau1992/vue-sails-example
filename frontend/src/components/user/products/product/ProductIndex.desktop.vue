<template>
  <div class="row">
    <div class="col">
      <b-card no-block>
        <b-tabs card ref="tabs">
          <b-tab :title="$t('tab.first')">
            <products-get keep-alive></products-get>
          </b-tab>
          <b-tab :title="$t('tab.second')">
            <product-create keep-alive></product-create>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
  import ProductIndexMixin from './ProductIndex.mixin'
  import ProductCreate from './ProductCreate.desktop'
  import ProductsGet from '../ProductsGet.desktop'

  export default {
    mixins: [ProductIndexMixin],

    components: {
      ProductCreate,
      ProductsGet
    }
  }
</script>
