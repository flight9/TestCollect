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
          <!--<qrscan-anyline @success="onQrscan" small></qrscan-anyline>-->
          <tri-qrscan small></tri-qrscan>
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <a @click="clickImage">
            <img :src="photo_src" class="responsive"/>
          </a>
        </td>
        <td class="text-center">
          <tri-photo></tri-photo>
        </td>
      </tr>
      <tr>
        <td>
          <q-input ref="reading_input" v-model.trim="reading" stack-label="Reading" error
                   type="number" :readonly="!readingEditing" align="right" @click="scrollBottom"
          />
        </td>
        <td class="text-center">
          <q-btn @click="toggleEditing" small>
            <q-icon :name="button_icon" />
          </q-btn>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <q-alert color="green" icon="help" v-show="questionMatch" :actions="[
            {label:'Yes, it does', handler:() => { showFinish = true }},
            {label:'No, I\'ll revise it.', handler:() => { toggleEditing() }},
          ]">
            Does the reading match the photo?
          </q-alert>
          <q-alert color="amber" icon="warning" v-show="hasWarning">
            {{warningPrompt}}
          </q-alert>
          <q-alert color="error" icon="warning" v-show="hasError">
            {{errPrompt}}
          </q-alert>
          <q-alert color="secondary" icon="edit" v-show="hasTest">
            You are editing.
          </q-alert>
          <q-select
            v-model="comment"
            stack-label="Comment:"
            :options="commentOptions"
            @change="commentChanged"
          />
        </td>
      </tr>
      </tbody>
    </table>
    </div>

    <q-btn color="primary" class="full-width fixed-bottom" @click="onSave" big v-show="showFinish">
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
    QSelect,
    QAlert
  } from 'quasar'
  import global_ from 'src/components/global'
  import transfer from 'src/api/tri_transfer'
  import { mapActions } from 'vuex'
  import PhotoCordova from 'src/components/tri_component/photo_cordova.vue'
//  import QrscanAnyline from 'src/components/tri_component/qrscan_anyline.vue'
  import PmscanAnyline from 'src/components/tri_component/pmscan_anyline.vue'
//  import PhotoWeb from 'src/components/tri_component/photo_web.vue'
  import TriPhoto from 'src/components/tri_component/tri_photo.vue'
  import TriQrscan from 'src/components/tri_component/tri_qrscan.vue'
//  import PhotoWechat from 'src/components/tri_component/photo_wechat.vue'
//  import QrscanWechat from 'src/components/tri_component/qrscan_wechat.vue'
  const { getScrollTarget, getScrollPosition, setScrollPosition } = scroll
  export default {
    components: {
      QBtn,
      QIcon,
      QInput,
      QSelect,
      QAlert,
      PhotoCordova,
      PmscanAnyline,
      TriPhoto,
      TriQrscan
    },
    props: {
    },
    data () {
      return {
        // data variables
        reading: 0,
        pm_no: '',
        photo_src: '',
        id: 0,
        npv: 1,
        comment: '',
        // status variables
        readingEditing: false,
        button_icon: 'edit',
        showFinish: false,
        questionMatch: false,
        hasWarning: false,
        hasError: false,
        warningPrompt: '',
        errPrompt: '',
        hasTest: false,
        // extra data
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
      // update result
      let sc = global_.scanResult
      if (sc.id === 0) {
        this.reading = sc.reading
        this.pm_no = sc.pm_no
        this.photo_src = sc.photo_src
        this.npv = sc.npv
        // Todo: search for barcode to get id
      }
      else {
        this.id = sc.id
        // Todo: read existing result
      }
      // update status
      this.questionMatch = this.checkResult()
    },
    mounted: function () {
    },
    methods: {
      checkResult () {
        this.hasError = this._hasError()
        if (this.hasError) {
          this.hasWarning = false
          this.questionMatch = false
          return false
        }
        this.hasWarning = this._hasWarning()
        if (this.hasWarning) {
          this.hasError = false
          this.questionMatch = false
          // this.$refs.comment.enable = true
          return false
        }
        return true
      },
      _hasError () {
        if (!this.pm_no) {
          this.errorPrompt = 'The meter NO. is empty. Please scan the barcode.'
          return true
        }
        if (!this.validateNumber(this.reading)) {
          this.errPrompt = 'The reading should not be empty, negative or with symbol.'
          return true
        }
        return false
      },
      _hasWarning () {
        if (this.reading === 0 && !this.comment) {
          this.warningPrompt = 'The reading is 0. Why? Pls comment below.'
          return true
        }
        return false
      },
      toggleEditing: function () {
        this.hasTest = !this.hasTest
        this.readingEditing = !this.readingEditing
        if (this.readingEditing) {
          this.$refs.reading_input.select()
          this.showFinish = false
          this.button_icon = 'check_circle'
        }
        else {
          this.showFinish = this.checkResult()
          this.button_icon = 'edit'
        }
      },
      validateNumber (data) {
        if (/^(\d+)(\.\d+)?$/.test(data)) {
          return true
        }
        else {
          return false
        }
      },
      /* global PhotoViewer */
      /* eslint no-undef: "error" */
      clickImage () {
        PhotoViewer.show(this.photo_src, 'Zoom')
      },
      scrollBottom () {
        // codes here is for bug: keyboard will cover the input element
        if (this.readingEditing) {
          let page = getScrollTarget(this.$refs.reading_input.$el)
          let pos = getScrollPosition(page)
          setScrollPosition(page, pos + 275, 500) // second(distance) is a number big enough, third is delay
        }
      },
      commentChanged (newValue) {
        this.showFinish = this.checkResult()
      },
      complete () {
        let params = {
          id: 1234,
          commit: 'ok',
          reading: this.reading
        }
        transfer.uploadImage(this.photo_src, 'photo', params).then((result) => {
          alert(result.response)
        }).catch((error) => {
          alert(error.source)
        })
      },
      onPmscan (result) {
        this.reading = result.reading
        global_.moveFilePersistent(result.imagePath)
          .then((url) => {
            this.photo_src = url
          })
        this.pm_no = result.barcode
        this.showFinish = this.checkResult()
      },
      onPhoto (result) {
        global_.moveFilePersistent(result.imageURI)
          .then((url) => {
            this.photo_src = url
          })
      },
      onQrscan (result) {
        this.pm_no = result.value
        this.showFinish = this.checkResult()
      },
      onPhotoWx (result) {
        // this.photo_src = result.localId
        console.log(result)
      },
      onQrscanWx (result) {
        alert(result.value)
      },
      onSave () {
        this.addResult({
          pm_no: this.pm_no,
          npv: this.npv,
          photo_src: this.photo_src,
          reading: this.reading,
          comment: this.comment,
          timestamp: (new Date()).valueOf()
        })
        this.$router.go(-1)
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
