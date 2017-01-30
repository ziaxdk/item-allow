// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import store from './store'
import MapPlugin from './plugins/MapPlugin.js'

Vue.use(MapPlugin);

/* eslint-disable no-new */
const vueInstance = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
window.vueInstance = vueInstance;

// console.log('vueInstance', vueInstance);
