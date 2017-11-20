<template>
  <q-btn @click="pmscan" :small="small">
    <q-icon name="aspect_ratio" />
  </q-btn>
</template>

<script>
  import {
    QBtn,
    QIcon
  } from 'quasar'
  import anyline from 'src/api/tri_anyline'
  export default {
    components: {
      QBtn,
      QIcon
    },
    props: {
      small: { // button small size
        type: Boolean,
        default: false
      },
      options: { // custom options
        type: Object,
        default  () {
          return { }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      pmscan () {
        anyline.energy.scan('AUTO_ANALOG_DIGITAL_METER').then((result) => {
          if (result.imagePath.startsWith('/')) {
            result.imagePath = 'file://' + result.imagePath
          }
          this.$emit('success', result)
        }).catch((error) => {
          this.$emit('fail', {message: error})
        })
      }
    }
  }
</script>

<style>
</style>
