<template>
  <div>
    <div class="row">
      <div class="col-8">
        <b-form-fieldset
          :description="$t('description.first')"
          :label="$t('label.first')"
          :label-size="1">
          <b-form-input v-model="title"></b-form-input>
        </b-form-fieldset>
      </div>

      <div class="col-4">
        <b-form-fieldset
          :description="$t('description.second')"
          :label="$t('label.second')"
          :label-size="1">
          <b-form-input v-model="price"></b-form-input>
        </b-form-fieldset>
      </div>
    </div>

    <b-form-fieldset
      :description="$t('description.third')"
      :label="$t('label.third')"
      :label-size="1">
      <b-form-input textarea v-model="description"></b-form-input>
    </b-form-fieldset>

    <b-button size="sm" variant="outline-success" @click="create">{{ $t('button.first') }}</b-button>
  </div>
</template>

<script>
  import ProductCreateMixin from './ProductCreate.mixin'

  export default {
    mixins: [ProductCreateMixin],

    methods: {
      create () {
        this.$store.dispatch('saveProduct', {
          product: this.product,
          user: this.user
        })
          .then(() => {
            // Success message

            this.$store.dispatch('getProductsByUser', this.user)
          }, () => {
            // Error message
          })
      }
    }
  }
</script>
