<template>
  <ul class="ul">
    <li v-for="(country, idx) in countries">
        <label class="pure-checkbox">
            <input type="checkbox" v-model="country.selected">
            {{country.name}}
        </label>

    </li>
  </ul>
</template>

<script>

export default {
  props: [ 'countries' ]
}
</script>

<style scoped>
  .ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>