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
  import wx from 'weixin-js-sdk'
  export default {
    name: 'qrscanWechat',
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
            scanType: ['qrCode', 'barCode'] // 可以指定扫二维码还是一维码，默认二者都有
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      qrscan () {
        var that = this
        wx.scanQRCode({
          needResult: 1, //  默认为0，扫描结果由微信处理，1 则直接返回扫描结果
          scanType: this.options.scanType,
          success: function (res) {
            var value = res.resultStr
            that.$emit('success', {value})
          },
          fail: function (res) {
            var message = res.errMsg
            that.$emit('fail', {message})
          }
        })
      }
    }
  }
</script>

<style>
</style>
