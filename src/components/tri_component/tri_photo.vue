<template>
  <component :is="photoComponent" @success="onPhoto" @fail="onFail"></component>
</template>

<script>
  import PhotoWeb from 'src/components/tri_component/photo_web.vue'
  import PhotoWechat from 'src/components/tri_component/photo_wechat.vue'

  var triPhoto = {
    name: 'triPhoto',
    components: {
    },
    data () {
      return {}
    },
    methods: {
      onPhoto (result) {
        /*
        if wechat {
          adad
        }
        esle {
          adfa
        }
        */
        console.info(result)
      },
      onFail (message) {
        console.error(message)
      }
    },
    computed: {
      photoComponent () {
        var photoCompenentChoice = 'PhotoWeb'
        switch (__PLATFORM) {
          case 'wechat':
            photoCompenentChoice = 'PhotoWechat'
            break
        }
        return photoCompenentChoice
      }
    }
  }

  triPhoto.components = {
    PhotoWeb // eslint-disable-line no-undef
  }
  switch (__PLATFORM) {
    case 'wechat':
      triPhoto.components = {
        PhotoWechat
      }
      break
  }

  export default triPhoto
</script>

<style>
</style>
