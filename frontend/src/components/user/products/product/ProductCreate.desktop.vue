<template>
  <div>
    <div class="row">
      <div class="col-8">
        <b-form-fieldset
          :description="$t('description.first')"
          :label="$t('label.first')">
          <b-form-input v-model="title" :state="isTitleValid"></b-form-input>
          <b-form-feedback v-for="(name, index) in errors.title" :key="index">
            {{ name }}
          </b-form-feedback>
        </b-form-fieldset>
      </div>

      <div class="col-4">
        <b-form-fieldset
          :description="$t('description.second')"
          :label="$t('label.second')">
          <b-form-input v-model="price" :state="isPriceValid"></b-form-input>
          <b-form-feedback v-for="(name, index) in errors.price" :key="index">
            {{ name }}
          </b-form-feedback>
        </b-form-fieldset>
      </div>
    </div>

    <b-form-fieldset
      :description="$t('description.third')"
      :label="$t('label.third')">
      <b-form-input textarea v-model="description" :state="isDescriptionValid"></b-form-input>
      <b-form-feedback v-for="(name, index) in errors.description" :key="index">
        {{ name }}
      </b-form-feedback>
    </b-form-fieldset>

    <b-button size="sm" variant="outline-success" @click="create">{{ $t('button.first') }}</b-button>
  </div>
</template>

<script>
  import ProductCreateMixin from './ProductCreate.mixin'
  import ProductValidation from './ProductValidation.mixin'

  export default {
    mixins: [ProductCreateMixin, ProductValidation],

    methods: {
      create () {
        this.$store.dispatch('postProduct', {
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
