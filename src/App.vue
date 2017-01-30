<template>
  <div class="pure-g">
    <Loading :loading="loading" :debounce="400"></Loading>


    <div class="pure-u-3-24">
      <ColMenu header="From" :active="from.selected"></ColMenu>
      <CountryList :countries="from.countries"></CountryList>
    </div>



    <div class="pure-u-18-24">
      <MapLoading :processing="mapProcessing"></MapLoading>
      <World :countries="bothCountries"></World>
    </div>



    <div class="pure-u-3-24">
      <ColMenu header="To" :active="to.selected"></ColMenu>
      <CountryList :countries="to.countries"></CountryList>
    </div>



  </div>
</template>

<script>
import World from './components/MapContainer.vue'
import ColMenu from './components/Menu.vue'
import Loading from './components/Loading.vue'
import CountryList from './components/CountryList.vue'
import MapLoading from './components/MapLoading.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['from', 'to', 'loading', 'mapProcessing']),
    ...mapGetters(['selected', 'bothCountries'])
    // fromAirports() {
    //   return this.from.countries.map(m => m.airports).reduce((acc, cur) => acc.push(cur), []);
    // }
  },
  components: {
    World, ColMenu, Loading, CountryList, MapLoading
  },
}


</script>

<style type="text/css" src="../node_modules/purecss/build/pure.css"></style>
<style type="text/css" src="../node_modules/font-awesome/css/font-awesome.css"></style>
<style scoped>
  .pure-g, .pure-u-18-24 {
    height: 100%;
    position: relative;
  }
</style>

