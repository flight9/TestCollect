<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  /*
   * Root component
   */
  import registerEvents from 'src/api/tri_events'
//  import wechat from 'src/api/tri_wechat' // only for ES6
  registerEvents()
  export default {
    mounted () {
      if (__PLATFORM === 'wechat') {
        var wechat = require('src/api/tri_wechat').default
        wechat.jsconfig()
      }
    }
  }
</script>

<style></style>
