const connection = {}

connection.testfunc = function () {
  alert('testfunc')
}

connection.checkConnection = function () {
  var states = {}
  states['unknown'] = 'Unknown connection'
  states['ethernet'] = 'Ethernet connection'
  states['wifi'] = 'WiFi connection'
  states['2g'] = 'Cell 2G connection'
  states['3g'] = 'Cell 3G connection'
  states['4g'] = 'Cell 4G connection'
  states['cellular'] = 'Cell generic connection'
  states['none'] = 'No network connection'

  var networkState = navigator.connection.type
  alert('Connection type: ' + states[networkState])
  alert(networkState)
}

connection.isConnecting = function () {
  var state = navigator.connection.type
  return (state !== 'unknown' && state !== 'none')
}

export default connection
