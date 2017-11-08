<template>
  <q-btn @click="takephoto" :small="small">
    <q-icon name="camera_alt" />
  </q-btn>
</template>

<script>
  import {
    QBtn,
    QIcon
  } from 'quasar'
  import wx from 'weixin-js-sdk'
  export default {
    components: {
      QBtn,
      QIcon
    },
    props: {
      small: { // button small size
        type: Boolean,
        default: true
      },
      options: { // custom options for photo
        type: Object,
        default  () {
          return {
            compressed: true
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      takephoto () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: [this.options.compressed ? 'compressed' : 'original'], // 'original', 'compressed'
          sourceType: ['camera'], // 'album', 'camera'
          success: function (res) {
            var localId = res.localIds[0] // localId可以作为img标签的src属性显示图片
            uploadPhoto(localId)
          }
        })

        function uploadPhoto (localId) {
          wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1, // 显示进度提示
            success: function (res) {
              var serverId = res.serverId
              this.$emit('success', {serverId, localId})
            },
            fail: function (res) {
              var message = res.errMsg
              this.$emit('fail', {message})
            }
          })
        }
      }
    }
  }
</script>

<style>
</style>
