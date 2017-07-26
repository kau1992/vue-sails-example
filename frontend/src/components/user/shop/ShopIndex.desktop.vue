<template>
  <div>
    <b-alert variant="info" show>
      {{ $t('alert.first') }}
    </b-alert>
    <div class="row">
      <div class="col-4" v-for="product in products">
        <b-card :key="product.id"
                :header="product.title"
                class="mb-4"
                show-footer>
          <p>{{ product.description }}</p>
          <b-button v-bind:disabled="product.user.name === user.name"
                    @click.native="pushToBasket(product)"
                    variant="outline-success"
                    size="sm">{{ $t('button.first') }}
          </b-button>
          <small slot="footer" class="text-muted">
            <span class="float-left">${{ product.price }}</span>
            <span class="float-right">{{ $t('span.first') }} {{ product.user.name }}</span>
          </small>
        </b-card>
      </div>
    </div>

    <b-pagination size="sm" :total-rows="amountOfProducts" :per-page="6" v-model="currentPage"></b-pagination>
  </div>
</template>

<script>
  import ShopIndexMixin from './ShopIndex.mixin'

  export default {
    mixins: [ShopIndexMixin]
  }
</script>
