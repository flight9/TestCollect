<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding" ref="page">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>
    <h6 class="text-center">Tid: {{id ? id : '(empty)'}}</h6>

    <div id="main-div" class="bg-lime-3 round-borders">
    <table class="q-table">
      <thead>
      <tr>
        <th class="text-left capitalize" width="90%">{{NPVLabel(npv,false)}}</th>
        <th class="text-center">
          <pmscan-anyline @success="onPmscan" small></pmscan-anyline>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="text-left">No. {{pm_no ? pm_no: '(empty)'}}</td>
        <td class="text-center">
          <qrscan-anyline @success="onQrscan" small></qrscan-anyline>
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <img :src="photo_src" class="responsive"/>
        </td>
        <td class="text-center">
          <photo-cordova @success="onPhoto" small></photo-cordova>
          <!--test:-->
          <!--wx:<photo-wechat @success="onPhotoWx" small></photo-wechat>-->
          <!--wx:<qrscan-wechat @success="onQrscanWx" small></qrscan-wechat>-->
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
          <q-alert color="green" icon="help"v-model="needConfirm" :actions="[
            {label:'Yes, it does', handler:() => {}},
            {label:'No, I\'ll revise it.', handler:() => {}},
          ]">
            Does the reading match the photo?
          </q-alert>
          <q-alert color="amber" icon="warning" v-model="hasWarning">
            The reading is less than that of last month. Why? Pls comment below.
          </q-alert>
          <q-alert color="error" icon="warning" v-model="hasWarning">
            The meter NO. is empty. Please scan the barcode.
          </q-alert>
          <q-select
            v-model="comment"
            stack-label="Comment:"
            :options="commentOptions"
          />
        </td>
      </tr>
      </tbody>
    </table>
    </div>

    <q-btn color="primary" class="full-width fixed-bottom" @click="onSave" big v-show="footer_show">
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
  import global_ from 'src/components/global'
  import transfer from 'src/api/tri_transfer'
  import { mapActions } from 'vuex'
  import PhotoCordova from 'src/components/tri_component/photo_cordova.vue'
  import QrscanAnyline from 'src/components/tri_component/qrscan_anyline.vue'
  import PmscanAnyline from 'src/components/tri_component/pmscan_anyline.vue'
//  import PhotoWechat from 'src/components/tri_component/photo_wechat.vue'
//  import QrscanWechat from 'src/components/tri_component/qrscan_wechat.vue'
  const { getScrollTarget, setScrollPosition } = scroll
  export default {
    components: {
      QBtn,
      QIcon,
      QInput,
      QSelect,
      QAlert,
      PhotoCordova,
      QrscanAnyline,
      PmscanAnyline
    },
    props: {
    },
    data () {
      return {
        final_reading: 0,
        input_reading: 0,
        pm_no: '',
        photo_src: '',
        id: 0,
        npv: 1,
        reading_editing: false,
        footer_show: true,
        button_icon: 'edit',
        needConfirm: true,
        hasWarning: true,
        hasError: true,
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
            value: 'newpm'
          },
          {
            label: 'It just recounted.',
            value: 'recount'
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
      if (sc.id === 0) {
        this.input_reading = this.final_reading = sc.reading
        this.pm_no = sc.pm_no
        this.photo_src = sc.photo_src
        this.npv = sc.npv
        // Todo: search for barcode to get id
      }
      else {
        this.id = sc.id
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
          id: 1234,
          commit: 'ok',
          reading: this.final_reading
        }
        transfer.uploadImage(this.photo_src, 'photo', params).then((result) => {
          alert(result.response)
        }).catch((error) => {
          alert(error.source)
        })
      },
      onSave () {
        this.addResult({
          pm_no: this.pm_no,
          npv: this.npv,
          photo_src: this.photo_src,
          reading: this.final_reading,
          comment: this.comment
        })
        this.$router.go(-1)
      },
      onPmscan (result) {
        this.final_reading = this.input_reading = result.reading
        this.photo_src = result.imagePath
        this.pm_no = result.barcode
      },
      onPhoto (result) {
        this.photo_src = result.imageURI
        alert(result.imageURI)
      },
      onQrscan (result) {
        this.photo_src = result.imagePath
        alert(result.value)
      },
      onPhotoWx (result) {
        this.photo_src = result.localId
        alert(result.serverId)
      },
      onQrscanWx (result) {
        alert(result.value)
      },
      ...mapActions(['addResult'])
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  #main-div
    padding 0px
    border: 2px solid $grey-5
</style>
