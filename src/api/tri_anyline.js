
const anyline = {}

anyline.myfunc = function () {
  alert('myfunc')
}

// This key must meet id(io.cordova.hellocordova)
anyline.licence_key = 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE3LTEwLTI2IiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjMwLCJzaG93UG9wVXBBZnRlckV4cGlyeSI6dHJ1ZSwiaW9zSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdLCJhbmRyb2lkSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdLCJ3aW5kb3dzSWRlbnRpZmllciI6WyJpby5jb3Jkb3ZhLmhlbGxvY29yZG92YSJdfQpEbmpScXpCNjcvak1qTzUwckhteG9ScWNOZzRwMi96dElhZ29hMUN2Z2xNN01KUDJKbVJQODBQQjg0a0hSU2xTTlgyeDI3eWJRNUFobTRLUDN0dGpZL1NXK2NyUTgvb3J6RytGSDJZd2cvY2t4bkhPckp3a2xjazNJbVhCNUFYMi9uRittKzFqNEcvQ3FyZXE1cy82NGtMbCt4c0xoMlJMS2Jxb0lZdFo2QmZrOGZ5cDZxWlN4YWp0ancvUG55RGlJNDRKSGpYSzlNZ1BQNVhRcE5vbUhxVnBNRm5qYnlrcHFWdFVmMGdxWDZ2SXFlRFhDSVNqbU9vZ29WYnJvSlBtRjA5YXp0RHZ1L3RwYkFpMitXeTkzZ0VFQWFSdExJQloxYXJ3T1BLYVdVSGJiZlhOVjlXLzJtSXRYZXRoWnR0R2FmUlpEU2NvZUlXSW5FTHJEWEhIVVE9PQ=='

anyline.energy = {
  // this is called for every energy scan result
  onResult: function (result) {
    // Unlock
    localStorage.setItem('hasStartedAnyline', false)

    console.log('Energy result: ' + JSON.stringify(result))

    // the result is a json-object containing the reading the meter type and a path to a cropped and a full image.
    // TODO: What's the structure?
    if (result.detectedBarcodes) {
      var detailsBarcodes = ''
      for (var i = 0; i < result.detectedBarcodes.length; i++) {
        detailsBarcodes += result.detectedBarcodes[i].value
        detailsBarcodes += ' (' + result.detectedBarcodes[i].format + ')'
        if (i < result.detectedBarcodes.length - 1) {
          detailsBarcodes += ', '
        }
      }
    }

    // Operate the DOM
    // var div = document.getElementById('results');
    // div.innerHTML = "<p>"
    // + "<img src=\"" + result.imagePath + "\" width=\"100%\" height=\"auto\"/><br/>"
    // + "<b>" + result.meterType + ":</b> " + result.reading
    // + (detailsBarcodes ? "<br/><i><b>Detected Barcodes:</b> " + detailsBarcodes + "</i>" : "")
    // + "<br/><i><b>Confidence:</b> " + result.confidence + "</i>"
    // + "<br/><i><b>Outline Points:</b> " + result.outline + "</i>"
    // + "</p>"
    // + div.innerHTML;

    // document.getElementById("details_scan_modes").removeAttribute("open");
    // document.getElementById("details_results").setAttribute("open", "");
    // window.scrollTo(0, 0);

    // Or simply alert()
    var output = result.imagePath +
        '\nmeterType: ' + result.meterType +
        '\nreading: ' + result.reading +
        '\nbarcodes: ' + detailsBarcodes +
        '\nconfidence: ' + result.confidence +
        '\noutline: ' + result.outline
    alert(output)
  },

  // called if an error occurred or the user canceled the scanning
  onError: function (error) {
    localStorage.setItem('hasStartedAnyline', false)

    if (error === 'Canceled') {
      // do stuff when user has canceled
      // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
      console.log('Energy scanning canceled')
      return
    }

    alert(error)
  },

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

  scan: function (scanMode, onSuccess = null) {
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

    let callback = onSuccess
    if (!onSuccess) {
      callback = this.onResult
    }
    cordova.exec(callback, this.onError, 'AnylineSDK', scanMode, this.energyConfig)
  }
}

export default anyline
