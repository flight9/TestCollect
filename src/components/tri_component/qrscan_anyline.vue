<template>
  <q-btn @click="qrscan" :small="small">
    <q-icon :name="icon" />
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
      icon: { // custom icon
        type: String,
        default: 'fullscreen'
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
