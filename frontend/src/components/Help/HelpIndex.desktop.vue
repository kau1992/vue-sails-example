<template>
  <b-modal id="modal" title="Submit your name">
    <b-form-input type="text" placeholder="Enter your name"></b-form-input>
  </b-modal>
</template>

<script>

export default {
  created () {
    this.$root.$emit('show::modal','modal');
  }
}
</script>
