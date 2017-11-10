
const anyline = {}

// This key must meet id(io.cordova.hellocordova)
anyline.licence_key = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE3LTEwLTI2IiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjMwLCJzaG93UG9wVXBBZnRlckV4cGlyeSI6dHJ1ZSwiaW9zSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdLCJhbmRyb2lkSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdLCJ3aW5kb3dzSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdfQpEbmpScXpCNjcvak1qTzUwckhteG9ScWNOZzRwMi96dElhZ29hMUN2Z2xNN01KUDJKbVJQODBQQjg0a0hSU2xTTlgyeDI3eWJRNUFobTRLUDN0dGpZL1NXK2NyUTgvb3J6RytGSDJZd2cvY2t4bkhPckp3a2xjazNJbVhCNUFYMi9uRittKzFqNEcvQ3FyZXE1cy82NGtMbCt4c0xoMlJMS2Jxb0lZdFo2QmZrOGZ5cDZxWlN4YWp0ancvUG55RGlJNDRKSGpYSzlNZ1BQNVhRcE5vbUhxVnBNRm5qYnlrcHFWdFVmMGdxWDZ2SXFlRFhDSVNqbU9vZ29WYnJvSlBtRjA5YXp0RHZ1L3RwYkFpMitXeTkzZ0VFQWFSdExJQloxYXJ3T1BLYVdVSGJiZlhOVjlXLzJtSXRYZXRoWnR0R2FmUlpEU2NvZUlXSW5FTHJEWEhIVVE9PQ=='

anyline.energy = {
  energyConfig: [
    anyline.licence_key,
    {
      'captureResolution': '720p',
      'cutout': {
        'style': 'rect',
        'alignment': 'top',
        'offset': {
          'x': 0,
          'y': 120
        },
        'strokeWidth': 2,
        'cornerRadius': 4,
        'strokeColor': 'FFFFFF',
        'outerColor': '000000',
        'outerAlpha': 0.3
      },
      'flash': {
        'mode': 'manual',
        'alignment': 'bottom_right'
      },
      'visualFeedback': {
        'style': 'CONTOUR_RECT',
        'strokeColor': '0099FF',
        'fillColor': '220099FF'
      },
      'beepOnResult': true,
      'vibrateOnResult': true,
      'blinkAnimationOnResult': true,
      'cancelOnResult': true,
      'reportingEnabled': true
    },
    {'nativeBarcodeEnabled': true}
  ],

  scan: function (scanMode) {
    return new Promise((resolve, reject) => {
      // Lock
      if (localStorage.getItem('hasStartedAnyline') === 'true') {
        return
      }
      localStorage.setItem('hasStartedAnyline', true)

      console.log('Start scan with mode ' + scanMode)
      // start the Energy scanning for the given scan mode
      // pass the success and error callbacks, as well as the license key and the config to the plugin
      // see http://documentation.anyline.io/#anyline-config for config details
      // and http://documentation.anyline.io/#energy for energy-module details

      if (scanMode === 'ANALOG_METER') {
        this.energyConfig[1].visualFeedback = {
          style: 'rect'
        }
      }
      else {
        this.energyConfig[1].visualFeedback = {
          style: 'contour_rect'
        }
      }

      // called if an error occurred or the user canceled the scanning
      var onError = (error) => {
        localStorage.setItem('hasStartedAnyline', false)

        if (error === 'Canceled') {
          // do stuff when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log('Energy scanning canceled')
          return
        }

        alert(error)
        reject(error)
      }

      // this is called for every energy scan result
      var onResult = (result) => {
        // Unlock
        localStorage.setItem('hasStartedAnyline', false)
        console.log('Energy result: ' + JSON.stringify(result))

        // the result is a json-object containing the reading the meter type and a path to a cropped and a full image.
        // if (result.detectedBarcodes) {
        //   var detailsBarcodes = ''
        //   for (var i = 0; i < result.detectedBarcodes.length; i++) {
        //     detailsBarcodes += result.detectedBarcodes[i].value
        //     detailsBarcodes += ' (' + result.detectedBarcodes[i].format + ')'
        //     if (i < result.detectedBarcodes.length - 1) {
        //       detailsBarcodes += ', '
        //     }
        //   }
        // }

        // Or simply alert()
        var detailsBarcodes = this.parseBarcode(result)
        var output = result.imagePath +
          '\nmeterType: ' + result.meterType +
          '\nreading: ' + result.reading +
          '\nbarcodes: ' + detailsBarcodes +
          '\nconfidence: ' + result.confidence +
          '\noutline: ' + result.outline
        console.log(output)

        // add parsed barcode for easy
        result.barcode = detailsBarcodes

        resolve(result)
      }

      cordova.exec(onResult, onError, 'AnylineSDK', scanMode, this.energyConfig)
    })
  },
  parseBarcode: function (result) {
    var detailsBarcodes = ''
    if (result.detectedBarcodes) {
      for (var i = 0; i < result.detectedBarcodes.length; i++) {
        detailsBarcodes += result.detectedBarcodes[i].value
        // Omit type and mutiple
      }
    }
    return detailsBarcodes
  }
}

anyline.barcode = {
  barcodeConfig: [
    anyline.licence_key,
    {
      'captureResolution': '720p',

      'cutout': {
        'style': 'rect',
        'maxWidthPercent': '80%',
        'maxHeightPercent': '80%',
        'alignment': 'center',
        'ratioFromSize': {
          'width': 100,
          'height': 80
        },
        'strokeWidth': 1,
        'cornerRadius': 3,
        'strokeColor': 'FFFFFF',
        'outerColor': '000000',
        'outerAlpha': 0.3
      },
      'flash': {
        'mode': 'manual',
        'alignment': 'bottom_right'
      },
      'visualFeedback': {
        'style': 'rect',
        'strokeColor': '0099FF',
        'fillColor': '220099FF',
        'animationDuration': 150
      },
      'beepOnResult': true,
      'vibrateOnResult': true,
      'blinkAnimationOnResult': true,
      'cancelOnResult': true,
      'doneButton': { // iOS only. Android uses hardware back button.
        'title': 'OK',
        'type': 'rect', // fullwidth, rect
        'cornerRadius': 0,
        // 'backgroundColor': '#EEEEEE', // default clearcolor
        'textColor': 'FFFFFF',
        'textColorHighlighted': 'CCCCCC',
        'fontSize': 33,
        'fontName': 'HelveticaNeue',
        'positionXAlignment': 'center', // left,right,center - no affect on fullwidth
        'positionYAlignment': 'bottom', // top, center, bottom
        'offset': {
          'x': 0, // postive -> right
          'y': -88 // postive -> down
        }
      }
    }
  ],
  scan: function () {
    return new Promise((resolve, reject) => {
      // start the barcode scanning
      // pass the success and error callbacks, as well as the license key and the config to the plugin
      // see http://documentation.anyline.io/#anyline-config for config details
      // and http://documentation.anyline.io/#barcode for barcode module details
      if (localStorage.getItem('hasStartedAnyline') === 'true') {
        return
      }
      localStorage.setItem('hasStartedAnyline', true)

      var onError = (error) => {
        localStorage.setItem('hasStartedAnyline', false)
        // called if an error occurred or the user canceled the scanning
        if (error === 'Canceled') {
          // when user has canceled
          // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
          console.log('Barcode scanning canceled')
          return
        }
        alert(error)
        reject(error)
      }

      var onResult = (result) => {
        // set started to false
        localStorage.setItem('hasStartedAnyline', false)
        // this is called with result of the barcode module
        // the result is a string containing the barcode

        var useful = result.imagePath + ','
        useful += result.outline + ','
        useful += result.value + ','
        useful += result.format
        console.log(useful)

        resolve(result)
      }

      // mode 'scanBarcode' is also still available (for backwards compatibility)
      cordova.exec(onResult, onError, 'AnylineSDK', 'BARCODE', this.barcodeConfig)
    })
  }
}

anyline.unlockScan = function () {
  localStorage.setItem('hasStartedAnyline', false)
}

export default anyline
