<template>
  <div class="row justify-content-md-center">
    <div class="col-6">
      <b-form-fieldset
        :description="$t('description.first')"
        :label="$t('label.first')">
        <b-form-input v-model="name" :state="isNameValid"></b-form-input>
        <b-form-feedback v-for="(name, index) in errors.name" :key="index">
          {{ name }}
        </b-form-feedback>
      </b-form-fieldset>
      <b-form-fieldset
        :description="$t('description.second')"
        :label="$t('label.second')">
        <b-form-input v-model="password" :state="isPasswordValid" type="password"></b-form-input>
        <b-form-feedback v-for="(password, index) in errors.password" :key="index">
          {{ password }}
        </b-form-feedback>
      </b-form-fieldset>
      <b-button variant="outline-success" size="sm" @click="create">{{ $t('button.first') }}</b-button>
    </div>
  </div>
</template>

<script>
  import RegisterMixin from './Register.mixin'
  import UserValidation from './User.validation'

  export default {
    mixins: [RegisterMixin, UserValidation]
  }
</script>
