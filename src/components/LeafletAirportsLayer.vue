<template>
</template>

<script>

export default {
  props: [ 'country' ],
  mounted () {
    // console.log('mounted.leafletairportslayer')
    var points = this.country.airports.map(e => L.marker([e.coordinate.lat, e.coordinate.lon]));
    this.layer = L.featureGroup(points);
    // .bindPopup('Hello world!')
    // .on('click', function() { alert('Clicked on a member of the group!'); })
    // .addTo(map);
    this.layer.addTo(this.$parent.map);
  },
  destroyed() {
    this.$parent.map.removeLayer(this.layer);
  }
}
</script>
