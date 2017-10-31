// Wait for device API libraries to load
//
function registerEvents () {
  document.addEventListener('deviceready', onDeviceReady, false)
}

// device APIs are available
//
function onDeviceReady () {
  console.log('deviceready...')
  document.addEventListener('volumedownbutton', onVolumeDownKeyDown, false)
}

function onVolumeDownKeyDown () {
  alert('volumedownbutton')
}

export default registerEvents
