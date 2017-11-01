/**
 * Upload a image in form-data format carrying otherFields
 * otherFields should be a key-value object.
 * @type {{uploadImage: (function(String, String, Object))}}
 */
const transfer = {
  uploadImage (fileUrl, fileKey, otherFields) {
    return new Promise((resolve, reject) => {
      /* global FileUploadOptions FileTransfer */
      /* eslint no-undef: "error" */
      // !! Assumes variable fileURL contains a valid URL to a text file on the device, eg fileEntry.toURL()
      // var fileURL = require('statics/quasar-logo.png')
      var fileURL = fileUrl

      var success = function (result) {
        resolve(result)
        // console.log('Code = ' + result.responseCode)
      }

      var fail = function (error) {
        alert('An error has occurred: Code = ' + error.code)
        reject(error)
      }

      var options = new FileUploadOptions()
      options.fileKey = fileKey
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
      options.mimeType = 'image/jpeg' // or text/plain
      options.params = otherFields

      const SERVER = 'http://posttestserver.com/post.php?dir=example'
      var ft = new FileTransfer()
      ft.upload(fileURL, encodeURI(SERVER), success, fail, options)
    })
  }
}

export default transfer
