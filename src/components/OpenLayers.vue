<template>
  <div class="openlayers-container">
    <div class="openlayers-map"></div>
    <slot></slot>
  </div>
</template>

<script>

import ol from 'OpenLayers';

export default {
  mounted() {
    this.createMap();
  },
  destroyed() {
  },
  methods: {
    createMap: function() {
      const element = this.$el.getElementsByClassName('openlayers-map')[0];
      const osm = new ol.layer.Tile({ source: new ol.source.OSM() });
      const view = new ol.View({
          center: ol.proj.fromLonLat([12, 55]),
          zoom: 10
        });
      const map = new ol.Map({
        target: element,
        layers: [ osm ],
        view: view
      });
      map.on('click', (e) => {
        let coords = ol.proj.toLonLat(e.coordinate);
        this.$emit('mapClicked', { lat: coords[1], lon: coords[0] });
      });
      this.map = map;
    }
  }
}
</script>

<style type="text/css" src="../../node_modules/openlayers/dist/ol.css"></style>
<style scoped>
  .openlayers-map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
