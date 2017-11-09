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
        default: false
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
        var that = this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: [this.options.compressed ? 'compressed' : 'original'], // 'original', 'compressed'
          sourceType: ['camera'], // 'album', 'camera'
          success: function (res) {
            var localId = res.localIds[0] // localId 可以作为 img 标签的 src 属性显示图片
            uploadPhoto(localId)
          },
          fail: function (res) {
            alert(res.message)
          }
        })

        function uploadPhoto (localId) {
          wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1, // 显示进度提示
            success: function (res) {
              var serverId = res.serverId
              that.$emit('success', {serverId, localId})
            },
            fail: function (res) {
              var message = res.errMsg
              that.$emit('fail', {message})
            }
          })
        }
      }
    }
  }
</script>

<style>
</style>
