<script>
  const scanResult = {
    id: 0,
    pm_no: '',
    npv: 1,
    photo_src: require('./img/no_reading.jpg'),
    reading: 9999.99,
    comment: '',
    reset: function () {
      this.id = 0
      this.pm_no = ''
      this.npv = 1
      this.photo_src = require('./img/no_reading.jpg')
      this.reading = 9999.99
      this.comment = ''
    }
  }

  const serverUrl = ''

  export default { serverUrl, scanResult }
</script>
