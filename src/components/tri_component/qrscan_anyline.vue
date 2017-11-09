<template>
  <q-btn @click="qrscan" :small="small">
    <q-icon name="fullscreen" />
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
      qrscan () {
        anyline.barcode.scan().then((result) => {
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
