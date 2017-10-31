<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding" ref="page">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>
    <h6 class="text-center">Tid: {{tid}}</h6>
    <h6 class="text-center">PM: {{barcode}}</h6>

    <div id="main-div" class="bg-lime-3 round-borders">
      <table class="q-table">
        <thead>
        <tr>
          <th class="text-left capitalize" width="90%">{{npv}}</th>
          <th class="text-right">
            <q-btn @click="scan" small>
              <q-icon name="fullscreen" />
            </q-btn>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">
            <img :src="photo_src" width="250"/>
          </td>
          <td class="text-right">
            <q-btn @click="" small>
              <q-icon name="edit" />
            </q-btn>
          </td>
        </tr>
        <tr>
          <td>
            <q-input ref="reading_input" v-model.trim="input_reading" stack-label="Reading" error
                     type="number" :readonly="!reading_editing" align="right" @click="scrollBottom"
            />
          </td>
          <td class="text-right">
            <q-btn @click="toggleReadingEdit" small>
              <q-icon :name="button_icon" />
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <q-select
              v-model="comment"
              stack-label="Comment?"
              :options="commentOptions"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <q-btn color="primary" class="full-width fixed-bottom" @click="complete" big v-show="footer_show">
      Complete
    </q-btn>
  </div>
</template>

<script>
  import {
    QBtn,
    QIcon,
    QInput,
    scroll,
    Alert,
    QSelect
  } from 'quasar'
  import anyline from 'src/api/tri_anyline'
  const { getScrollTarget, setScrollPosition } = scroll
  export default {
    components: {
      QBtn,
      QIcon,
      QInput,
      QSelect
    },
    props: {
    },
    data () {
      return {
        final_reading: 0,
        input_reading: 0,
        barcode: '',
        photo_src: '',
        tid: 0,
        npv: '',
        reading_editing: false,
        footer_show: true,
        button_icon: 'edit',
        comment: '',
        commentOptions: [
          {
            label: '(No comment)',
            value: ''
          },
          {
            label: 'The PM is broken.',
            value: 'broken'
          },
          {
            label: 'We changed a new PM.',
            value: 'new'
          },
          {
            label: 'I don\'t know why.',
            value: 'unknown'
          }
        ]
      }
    },
    computed: {},
    created: function () {
      let sc = this.$parent.$parent.scan_result
      if (sc.tid === 0) {
        this.input_reading = this.final_reading = sc.reading
        this.barcode = sc.barcode
        this.photo_src = sc.photo_src
        this.npv = sc.npv
        // Todo: search for barcode to get tid
      }
      else {
        this.tid = sc.tid
        // Todo: read existing result
      }
    },
    methods: {
      toggleReadingEdit: function () {
        this.reading_editing = !this.reading_editing
        if (this.reading_editing) {
          this.$refs.reading_input.select()
          this.footer_show = false
          this.button_icon = 'check_circle'
        }
        else {
          this.footer_show = true
          this.button_icon = 'edit'
          if (this.check(this.input_reading)) {
            this.final_reading = this.input_reading
          }
          else {
            Alert.create({
              html: 'Error: the input is out of range!',
              color: 'error'
            })
            this.input_reading = this.final_reading
          }
        }
      },
      check (data) {
        if (data > 10) {
          return true
        }
        else {
          return false
        }
      },
      scrollBottom () {
        // codes here is for bug: keyboard will cover the input element
        let page = getScrollTarget(this.$refs.reading_input.$el)
        setScrollPosition(page, 1000, 500) // 1000 is a number big enough
      },
      complete () {
        // !! Assumes variable fileURL contains a valid URL to a text file on the device, eg fileEntry.toURL()
        // var fileURL = require('statics/quasar-logo.png')
        var fileURL = this.photo_src

        var success = function (result) {
          // console.log('Successful upload...')
          alert(result.response)
          // console.log('Code = ' + result.responseCode)
        }

        var fail = function (error) {
          alert('An error has occurred: Code = ' + error.code)
        }

        var options = new FileUploadOptions()
        options.fileKey = 'file'
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
        options.mimeType = 'text/plain'

        var params = {}
        params.value1 = 'test'
        params.value2 = 'param'
        options.params = params

        const SERVER = 'http://posttestserver.com/post.php?dir=example'
        var ft = new FileTransfer()
        // SERVER must be a URL that can handle the request, like
        // http://some.server.com/upload.php
        ft.upload(fileURL, encodeURI(SERVER), success, fail, options)
      },
      scan () {
        anyline.energy.scan('AUTO_ANALOG_DIGITAL_METER', this.onSuccess)
      },
      onSuccess (result) {
        // Unlock
        localStorage.setItem('hasStartedAnyline', false)
        console.log('Energy result: ' + JSON.stringify(result))

        // Parse barcode
        if (result.detectedBarcodes) {
          var detailsBarcodes = ''
          for (var i = 0; i < result.detectedBarcodes.length; i++) {
            detailsBarcodes += result.detectedBarcodes[i].value
            // Omit type and mutiple
          }
        }

        // Reading
        // Todo: check the new barcode is the same barcode
        this.final_reading = this.input_reading = result.reading
        this.photo_src = result.imagePath
        this.barcode = detailsBarcodes
      }
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  #main-div
    padding 5px
    border: 2px solid $grey-5

</style>
