<template>
  <div class="row">
    <div class="col">
      <b-card no-body>
        <b-tabs card ref="tabs">
          <b-tab :title="$t('tab.first')">
            <products-get keep-alive></products-get>
          </b-tab>
          <b-tab :title="$t('tab.second')">
            <product-post keep-alive></product-post>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
  import ProductIndexMixin from './ProductIndex.mixin'

  export default {
    mixins: [ProductIndexMixin],

    components: {
      ProductPost: () => import('./ProductPost.desktop'),
      ProductsGet: () => import('../ProductsGet.desktop')
    }
  }
</script>
