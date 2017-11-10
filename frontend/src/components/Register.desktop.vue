<template>
  <div class="row justify-content-md-center">
    <div class="col-6">
      <b-form-fieldset
        :description="$t('description.first')"
        :label="$t('label.first')"
        :label-size="1">
        <b-form-input v-model="name" :state="isNameValid"></b-form-input>
        <b-form-feedback v-for="(name, index) in errors.name" :key="index">
          {{ name }}
        </b-form-feedback>
      </b-form-fieldset>
      <b-form-fieldset
        :description="$t('description.second')"
        :label="$t('label.second')"
        :label-size="1">
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
  import isEmpty from 'lodash/isEmpty'
  import validate from 'validate.js'

  export default {
    mixins: [RegisterMixin],

    data () {
      return {
        errors: {
          name: [],
          password: []
        }
      }
    },

    computed: {
      isNameValid: {
        get () {
          if (isEmpty(this.user.name)) return null

          let validation = validate.single(this.user.name, {
            presence: true,
            length: {
              minimum: 3,
              message: 'Name must be at least three characters long'
            },
            format: {
              pattern: '^[A-Z](.*)$',
              message: 'Name must start capitalized'
            }
          })

          if (validation) {
            this.errors.name = validation

            return false
          }

          return true
        }
      },

      isPasswordValid: {
        get () {
          if (isEmpty(this.user.password)) return null

          let validation = validate.single(this.user.password, {
            presence: true,
            length: {
              minimum: 3,
              message: 'Password must be at least three characters long'
            }
          })

          if (validation) {
            this.errors.password = validation

            return false
          }

          return true
        }
      }
    }
  }
</script>
