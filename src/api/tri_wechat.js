/**
 * Wechat js API
 * photo_wechat.vue and qrscan_wechat.vue depend on jsconfig()
 */
import wx from 'weixin-js-sdk'
import axios from 'axios'
const wechat = {
  jsconfig () {
    var data = {
      url: window.location.href.split('#')[0]
    }
    axios.post('/api/jsconfig', // api on our server when prod or a proxy server when dev
      data).then((response) => {
      var cfg = response.data
      // console.log(cfg)
      wx.config({
        debug: true, // true 开启调试模式。
        appId: cfg.appId,
        timestamp: cfg.timestamp,
        nonceStr: cfg.nonceStr,
        signature: cfg.signature,
        jsApiList: ['chooseImage', 'uploadImage', 'scanQRCode'] // 看具体要调用的接口
      })
      wx.error(function (res) {
        alert(res.errMsg)
      })
      wx.ready(function () {
        // This will always be called even when there is error
        // alert('jssdk ready')
      })
    })
  },
  inWechat () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
  }
}

export default wechat
