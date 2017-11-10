<template>
  <b-modal size="lg" id="patch-product" :hide-header-close="true">
    <template slot="modal-title">{{ $t('template.first.title') }}</template>
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

    <template slot="modal-footer">
      <b-button size="sm" variant="outline-primary" @click="cancel">{{ $t('button.first') }}</b-button>
      <b-button size="sm" variant="outline-success" @click="patchProduct">{{ $t('button.second') }}</b-button>
    </template>
  </b-modal>
</template>

<script>
  import ProductPatchMixin from './ProductPatch.mixin'

  export default {
    mixins: [ProductPatchMixin],

    created () {
      this.$store.dispatch('getProduct', this.id)
        .then(product => {
          this.$root.$emit('bv::show::modal', 'patch-product')

          this.$store.commit('SET_PRODUCT_TITLE', product.title)
          this.$store.commit('SET_PRODUCT_DESCRIPTION', product.description)
          this.$store.commit('SET_PRODUCT_PRICE', product.price)
        }, () => {
          // Error message
        })
    },

    methods: {
      patchProduct () {
        this.$store.dispatch('patchProduct', {
          id: this.id,
          title: this.title,
          price: this.price,
          description: this.description
        })
          .then(() => {
            // Success message

            this.$store.dispatch('getProductsByUser', this.user)
            this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', false)
            this.$store.commit('RESET_PRODUCT')
          }, () => {
            // Error message
          })
      },

      cancel () {
        this.$store.commit('SET_IS_EDIT_PRODUCT_VISIBLE', false)
        this.$root.$emit('bv::hide::modal', 'patch-product')
      }
    },

    destroyed () {
      this.$root.$emit('bv::hide::modal', 'patch-product')
      this.$store.commit('RESET_PRODUCT')
    }
  }
</script>
