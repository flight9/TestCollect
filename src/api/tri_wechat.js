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
    axios.post('/tri-wechat-api/jsconfig', // api on our server when prod or a proxy server when dev
      data).then((response) => {
      var cfg = response.data
      wx.config({
        debug: true, // true 开启调试模式。
        appId: cfg.appId,
        timestamp: cfg.timestamp,
        nonceStr: cfg.nonceStr,
        signature: cfg.signature,
        jsApiList: ['chooseImage', 'uploadImage', 'scanQRCode', 'getLocalImgData'] // 看具体要调用的接口
      })
      wx.error(function (res) {
        alert(res.errMsg)
      })
      wx.ready(function () {
        // This will always be called even when there is an error
        // alert('jssdk ready')
      })
    })
  },
  inWechat () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
  },
  phoneType () {
    let type = 'unknown'
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      type = 'iphone'
    }
    else if (/(Android)/i.test(navigator.userAgent)) {
      type = 'android'
    }
    return type
  }
}

// ONLY for ES6:
export default wechat
