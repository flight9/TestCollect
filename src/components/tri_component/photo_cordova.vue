<template>
  <q-btn @click="takephoto" :small="small">
    <q-icon name="camera_alt" />
  </q-btn>
</template>

<script>
  /* global Camera */
  /* eslint no-undef: "error" */
  import {
    QBtn,
    QIcon
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QIcon
    },
    props: {
      small: {
        type: Boolean,
        default: true
      },
      options: {
        type: Object,
        default  () {
          return {
            height: 720,
            width: 540
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      takephoto () {
        return new Promise((resolve, reject) => {
          var onSuccess = (imageURI) => {
            this.$emit('success', {imageURI})
            resolve(imageURI)
          }

          var onFail = (message) => {
            if (message === 'Camera cancelled.') {
              return
            }
            alert('Failed because: ' + message)
            this.$emit('fail', message)
            reject(message)
          }

          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetHeight: this.options.height,
            targetWidth: this.options.width,
            correctOrientation: true
          }

          navigator.camera.getPicture(onSuccess, onFail, options)
        })
      }
    }
  }
</script>

<style>
</style>
