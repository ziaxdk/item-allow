<template>
  <div class="leaflet-container">
    <div class="leaflet-map"></div>
    <slot></slot>
  </div>
</template>

<script>
import L from 'leaflet';
// import 'leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: icon2x,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize:  [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


export default {
  mounted() {
    console.log('mounted.leaflet')
    this.createMap();
  },
  destroyed() {
    this.removeMap();
  },
  methods: {
    createMap: function() {
      const element = this.$el.getElementsByClassName('leaflet-map')[0];
      const map = L.map(element, { attributionControl: false }).setView([51.505, -0.09], 3);

      const layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      map.on('click', (ev) => {
        let latLon = { lat: ev.latlng.lat, lon: ev.latlng.lng };
        this.$store.dispatch('addCountryLayer', latLon);
      });
      layer.addTo(map);
      // this.$emit('ready');
      this.map = map;
      // console.log('emit ready');
    },
    removeMap: function() {
      this.map.remove();
    }
  }
}
</script>

<style type="text/css" src="../../node_modules/leaflet/dist/leaflet.css"></style>
<style scoped>
  .leaflet-container {
    height: 100%;
/*    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
*/  }
</style>
