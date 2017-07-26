<template>
  <div class="row justify-content-md-center">
    <div class="col-6">
      <b-form-fieldset :description="$t('description.first')" :label="$t('label.first')" :label-size="1">
        <b-form-input v-model="name"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset :description="$t('description.second')" :label="$t('label.second')" :label-size="1">
        <b-form-input v-model="password" type="password"></b-form-input>
      </b-form-fieldset>
      <b-button variant="outline-success" size="sm" @click="login">{{ $t('button.first') }}</b-button>
    </div>
    <div class="col-6">
      <figure class="figure">
      <pre>
        [
          {
            name: 'Joe',
            password: 'toasty'
          }, {
            name: 'Anna',
            password: 'sunflower'
          }, {
            name: 'Tom',
            password: 'jerry'
          }
        ]
      </pre>
        <figcaption class="figure-caption">{{ $t('figcaption.first') }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  import LoginMixin from './Login.mixin'

  export default {
    mixins: [LoginMixin]
  }
</script>
