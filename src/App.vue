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
registerEvents()
export default {}
</script>

<style></style>
