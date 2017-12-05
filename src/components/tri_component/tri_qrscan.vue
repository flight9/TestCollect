<template>
  <component :is="qrscanComponent" @success="onQrscan" @fail="onFail" :small="small"></component>
</template>

<script>
  import QrscanWechat from 'src/components/tri_component/qrscan_wechat.vue'

  var triQrscan = {
    name: 'triQrscan',
    components: {
    },
    props: {
      small: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      onQrscan (result) {
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
      qrscanComponent () {
        var compenentChoice
        switch (__PLATFORM) {
          case 'wechat':
            compenentChoice = 'QrscanWechat'
            break
          default:
            compenentChoice = ''
        }
        return compenentChoice
      }
    }
  }

  switch (__PLATFORM) {
    case 'wechat':
      triQrscan.components = {
        QrscanWechat
      }
      break
    default:
      triQrscan.components = {}
  }

  export default triQrscan
</script>

<style>
</style>
