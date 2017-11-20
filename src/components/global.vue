<script>
  const scanResult = {
    id: 0,
    pm_no: '999999',
    npv: 1,
    photo_src: require('./img/no_reading.jpg'),
    reading: 9999.99,
    comment: '',
    reset: function () {
      this.id = 0
      this.pm_no = ''
      this.npv = 1
      this.photo_src = require('./img/no_reading.jpg')
      this.reading = -1
      this.comment = ''
    }
  }

  const serverUrl = ''

  /**
   * Move a file to persistent folder
   * @param string file
   * @returns {Promise} result in .then() is a absolute url
   */
  function moveFilePersistent (file) {
    /* global LocalFileSystem */
    /* eslint no-undef: "error" */
    return new Promise((resolve, reject) => {
      function resOnError (error) {
        console.log('Error on copy file: ' + error.code)
        reject(error)
      }

      window.resolveLocalFileSystemURL(file,
        function resolveOnSuccess (entry) {
          var newDirectory = 'tri_photos' // custom directory here
          var newFileName = entry.name
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
            // The folder is created if doesn't exist
            fileSys.root.getDirectory(newDirectory,
              {create: true, exclusive: false},
              function (directory) {
                entry.moveTo(directory, newFileName, function (entry) {
                  // Now we can use "entry.toURL()" for the img src
                  console.log(entry.toURL())
                  resolve(entry.toURL())
                }, resOnError)
              },
              resOnError)
          }, resOnError)
        }, resOnError)
    })
  }

  export default { serverUrl, scanResult, moveFilePersistent }
</script>
