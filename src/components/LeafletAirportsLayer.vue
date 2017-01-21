<template>
</template>

<script>

export default {
  props: [ 'country' ],
  mounted () {
    // console.log('mounted.leafletairportslayer')
    console.log('start airports');
    var points = this.country.airports.map(e => L.marker([e.coordinate.lat, e.coordinate.lon]));
    this.layer = L.featureGroup(points);
    // .bindPopup('Hello world!')
    // .on('click', function() { alert('Clicked on a member of the group!'); })
    // .addTo(map);
    this.layer.on('add', () => console.log('end airports'));
    this.layer.addTo(this.$parent.map);
  },
  destroyed() {
    this.$parent.map.removeLayer(this.layer);
  }
}
</script>
