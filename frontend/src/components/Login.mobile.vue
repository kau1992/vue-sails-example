<template>
  <div>
    <mt-field :label="$t('label.first')" v-model="name"></mt-field>
    <mt-field :label="$t('label.second')" v-model="password" type="password"></mt-field>

    <mt-cell title="">
      <mt-button size="small" type="primary" @click="login" plain>{{ $t('button.first') }}</mt-button>
    </mt-cell>
  </div>
</template>

<script>
  import LoginMixin from './Login.mixin'

  export default {
    mixins: [LoginMixin]
  }
</script>
