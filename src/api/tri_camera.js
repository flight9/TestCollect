// deprecated, now use photo_cordova.vue instead

/* global Camera */
/* eslint no-undef: "error" */
const camera = {
  takeMeter () {
    return new Promise((resolve, reject) => {
      var onSuccess = (imageURI) => {
        resolve(imageURI)
      }

      var onFail = (message) => {
        if (message === 'Camera cancelled.') {
          return
        }
        alert('Failed because: ' + message)
        reject(message)
      }

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        targetHeight: 720,
        targetWidth: 540,
        correctOrientation: true
      }

      navigator.camera.getPicture(onSuccess, onFail, options)
    })
  }
}

export default camera
