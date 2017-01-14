<template>
</template>

<script>

export default {
  props: [ 'country' ],
  mounted: function() {
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(this.country.geo)
    });


     var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
      });

    // console.log('mounted', this.country.name, this.$parent.map);

    console.log(this.$parent.map.addLayer(vectorLayer))
  },
  destroyed: function() {
    console.log('destroyed');
  }
}
</script>
