<template>
  <div>
    <mt-field :label="$t('label.first')" v-model="name"></mt-field>
    <mt-field :label="$t('label.second')" v-model="password" type="password"></mt-field>

    <mt-cell title="">
      <mt-button size="small" type="primary" @click="create" plain>{{ $t('button.first') }}</mt-button>
    </mt-cell>
  </div>
</template>

<script>
  import RegisterMixin from './Register.mixin'

  export default {
    mixins: [RegisterMixin]
  }
</script>
