<template>
  <div class="container" v-show="processing">
  </div>
</template>

<script>

export default {
  props: [ "processing" ]
}
</script>

<style scoped>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    opacity: 0.2;
    background-color: black;
  }  
</style>
