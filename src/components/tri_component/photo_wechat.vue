<template>
  <div>
    <q-btn @click="takephoto" :small="small" style="vertical-align: top;" ref="btn">
      <q-icon name="camera_alt" />
    </q-btn>
    <img v-show="localId" :height="imgHeight" :width="imgHeight" :src="localId"/>
  </div>
</template>

<script>
  import {
    QBtn,
    QIcon
  } from 'quasar'
  import wx from 'weixin-js-sdk'
  export default {
    name: 'photoWechat',
    components: {
      QBtn,
      QIcon
    },
    mounted () {
      this.matchHeight()
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
      return {
        localId: '',
        imgHeight: '40px'
      }
    },
    methods: {
      matchHeight () {
        this.imgHeight = this.$refs.btn.$el.clientHeight + 'px'
      },
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
              // Determin if the client are using ios wkwebview
              alert('wxjs_is_wkwebview is: ' + window.wxjs_is_wkwebview + ',' + window.__wxjs_is_wkwebview)
              if (window.wxjs_is_wkwebview === true) {
                wx.getLocalImgData({
                  localId: localId, // 图片的localID
                  success: function (res) {
                    that.localId = res.localData // localData是图片的base64数据，可以用img标签显示
                  }
                })
              }
              else {
                that.localId = localId
              }
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
