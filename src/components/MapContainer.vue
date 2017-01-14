<template>
<!--     <OpenLayers v-on:mapClicked="mapClicked">
      <OpenLayersCountryLayer v-for="country in countries" :key="country.name" :country="country"></OpenLayersCountryLayer>

    </OpenLayers>
 -->
    <Leaflet>
      <LeafletLayer v-for="country in countries" :key="country.name" :country="country"></LeafletLayer>
      <LeafletAirportsLayer v-for="country in countries" :key="country.name" :country="country"></LeafletAirportsLayer>
    </Leaflet>  

</template>

<script>
// import OpenLayers from './OpenLayers.vue'
// import OpenLayersCountryLayer from './OpenLayersCountryLayer.vue'
import Leaflet from './Leaflet.vue'
import LeafletLayer from './LeafletLayer.vue'
import LeafletAirportsLayer from './LeafletAirportsLayer.vue'

export default {
  props: [ 'countries' ],
  components: { Leaflet, LeafletLayer, LeafletAirportsLayer }
}
</script>

<style scoped>
</style>
