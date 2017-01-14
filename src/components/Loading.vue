<template>
  <div v-if="show">
    <div class="overlay"></div>
    <img class="loading-gif" src="./loading.gif" >
  </div>
</template>

<script>

export default {
  // props: [ 'loading' ],
  props: {
    loading: Boolean,
    debounce: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      isRunning: null,
      show: false
    }
  },
  watch: {
    loading(val) {
      if (!val && this.isRunning) {
        clearTimeout(this.isRunning);
        this.isRunning = null;
        this.show = false;
        return;
      }
      if (val && !this.isRunning) {
        this.isRunning = setTimeout(() => {
          this.show = true;
        }, this.debounce);
      }
    }
  }
}

</script>

<style scoped>
  .overlay {
    z-index: 10000;
    opacity: 0.2;
    background: black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .loading-gif {
    z-index: 10001;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -98px 0px 0px -98px;
  }
</style>