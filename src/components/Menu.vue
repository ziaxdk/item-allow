<template>
  <div class="pure-menu pure-menu-horizontal" :class="{'active-bg': active}">
      <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected">
            <a href="#" class="pure-menu-link" :class="{'active': active}" @click="setSelected(header)">
              <i class="fa fa-plane" :class="{'fa-rotate-270': header === 'To' }" aria-hidden="true"></i> {{header}}</a>
          </li>
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
              <a href="#" id="menuLink1" class="pure-menu-link">Menu</a>
              <ul class="pure-menu-children">
                  <li class="pure-menu-item"><a href="#" class="pure-menu-link">Email</a></li>
                  <li class="pure-menu-item"><a href="#" class="pure-menu-link">Twitter</a></li>
                  <li class="pure-menu-item"><a href="#" class="pure-menu-link">Tumblr Blog</a></li>
              </ul>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: [ 'header', 'active' ],
  methods: {
    ...mapMutations(['setSelected'])
  }
}

</script>

<style scoped="">
  .active {
    font-weight: bold;
  }
  .active-bg {
    background-color: #cfc;
  }
</style>