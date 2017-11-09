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
  import wechat from 'src/api/tri_wechat'
  registerEvents()
  export default {
    mounted () {
      wechat.jsconfig()
    }
  }
</script>

<style></style>
