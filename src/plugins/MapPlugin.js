const MapPlugin = {};
MapPlugin.install = function (Vue, options) {
  // console.log('MapPlugin.install', arguments);
  // 1. add global method or property
  // Vue.myGlobalMethod = function () {
  //   // something logic ...
  // }
  // // 2. add a global asset
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // something logic ...
  //   }
  // })
  // 3. inject some component options
  Vue.mixin({
    created: function () {
      // console.log('MapPlugin.created');
    }
  })
  // // 4. add an instance method
  // Vue.prototype.$myMethod = function (options) {
  //   // something logic ...
  // }
}
export default MapPlugin;