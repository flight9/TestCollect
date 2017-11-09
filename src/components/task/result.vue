<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding" ref="page">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>
    <h6 class="text-center">Tid: {{tid}}</h6>
    <h6 class="text-center">PM: {{barcode}}</h6>

    <!--<div id="main-div" class="bg-lime-3 round-borders">-->
    <table class="q-table">
      <thead>
      <tr>
        <th class="text-left capitalize" width="90%">{{npv}}</th>
        <th class="text-center">
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
        <td class="text-center">
          <photo-cordova @success="onPhoto" small></photo-cordova>
          <br/>
          wx:<photo-wechat @success="onPhotoWx" small></photo-wechat>
        </td>
      </tr>
      <tr>
        <td>
          <q-input ref="reading_input" v-model.trim="input_reading" stack-label="Reading" error
                   type="number" :readonly="!reading_editing" align="right" @click="scrollBottom"
          />
        </td>
        <td class="text-center">
          <q-btn @click="toggleReadingEdit" small>
            <q-icon :name="button_icon" />
          </q-btn>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <q-alert color="amber" icon="warning":actions="[{label:'Snooze', handler:() => {}}]">
            You have a warning for reading.
          </q-alert>
          <q-select
            v-model="comment"
            stack-label="Comment?"
            :options="commentOptions"
          />
        </td>
      </tr>
      </tbody>
    </table>

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
    QSelect,
    QAlert
  } from 'quasar'
  import anyline from 'src/api/tri_anyline'
  import global_ from 'src/components/global'
  import transfer from 'src/api/tri_transfer'
  import PhotoCordova from 'src/components/tri_component/photo_cordova.vue'
  import PhotoWechat from 'src/components/tri_component/photo_wechat.vue'
  const { getScrollTarget, setScrollPosition } = scroll
  export default {
    components: {
      QBtn,
      QIcon,
      QInput,
      QSelect,
      QAlert,
      PhotoCordova,
      PhotoWechat
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
      let sc = global_.scanResult
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
        let params = {
          tid: 1234,
          commit: 'ok',
          reading: this.final_reading
        }
        transfer.uploadImage(this.photo_src, 'photo', params).then((result) => {
          alert(result.response)
        }).catch((error) => {
          alert(error.source)
        })
      },
      scan () {
        anyline.energy.scan('AUTO_ANALOG_DIGITAL_METER').then((result) => {
          // Reading
          // Todo: check the new barcode is the same barcode
          this.final_reading = this.input_reading = result.reading
          this.photo_src = result.imagePath
          this.barcode = anyline.energy.parseBarcode(result)
        })
      },
      onPhoto (result) {
        this.photo_src = result.imageURI
        alert(result.imageURI)
      },
      onPhotoWx (result) {
        this.photo_src = result.localId
        alert(result.serverId)
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
