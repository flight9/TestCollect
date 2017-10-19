<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>

    <q-btn color="primary" class="full-width fixed-bottom" @click="complete" big>
      Complete
    </q-btn>
  </div>
</template>

<script>
  import {
    QBtn,
    QIcon
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QIcon
    },
    data () {
      return {}
    },
    methods: {
      complete: function () {
        alert('complete')
      }
    }
  }
</script>

<style>
</style>
