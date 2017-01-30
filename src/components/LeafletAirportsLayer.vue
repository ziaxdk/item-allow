<template>
</template>

<script>
import Promise from 'es6-promise'

export default {
  props: [ 'country' ],
  mounted () {
    // console.log('mounted.leafletairportslayer')
    // console.log('start airports');
    this.$emit('status', { processing: true });
    // var points = this.country.airports.map(e => L.marker([e.coordinate.lat, e.coordinate.lon]));
    // this.layer = L.featureGroup(points);
    // // .bindPopup('Hello world!')
    // // .on('click', function() { alert('Clicked on a member of the group!'); })
    // // .addTo(map);
    // this.layer.on('add', () => this.$emit('status', { processing: false }));
    // this.layer.addTo(this.$parent.map);

    new Promise((resolve) => {
      setTimeout(() => {
        var points = this.country.airports.map(e => L.marker([e.coordinate.lat, e.coordinate.lon]));
        this.layer = L.featureGroup(points);
        // .bindPopup('Hello world!')
        // .on('click', function() { alert('Clicked on a member of the group!'); })
        // .addTo(map);
        this.layer.on('add', resolve);
        this.layer.addTo(this.$parent.map);
      })
    })
    .then(() => this.$emit('status', { processing: false }))
  },
  destroyed() {
    this.$parent.map.removeLayer(this.layer);
  }
}
</script>
