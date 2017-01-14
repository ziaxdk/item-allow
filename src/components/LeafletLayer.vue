<template>
</template>

<script>

export default {
  props: [ 'ready', 'country' ],
  // mapReady() {
  //   console.log('LeafletLayer.mapReady', this);
  // },
  watch: {
    // ready: function(n ,o) {
    //   // console.log('LeafletLayer.watch.ready', n, o, this.$parent.map);
    //   console.log('LeafletLayer.watch.ready', n, this.geo);
    // },
  },
  mounted() {
    // console.log('mounted.leafletlayer')

    this.geoJSONLayer = L.geoJSON(this.country.geo);
    this.geoJSONLayer.addTo(this.$parent.map);
  },
  destroyed() {
    this.$parent.map.removeLayer(this.geoJSONLayer);
  }
}

</script>
