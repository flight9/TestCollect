<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h6 class="text-center">Power Meter Reading Collection - DEC,2017</h6>
    <h6 class="text-center">6 pending tasks</h6>
    <q-search
      v-model="search_text"
      icon=""
      :after="[{
        icon:'search',
        handler () {
          onSearch()
        }
      }]"
    />
    <div class="row justify-center">
      <pmscan-anyline @success="onPmscan"></pmscan-anyline>
      <q-btn @click="scanFake">
        Continue
      </q-btn>
      <qrscan-anyline @success="onQrscan"></qrscan-anyline>
    </div>
    <q-btn color="primary" class="full-width fixed-bottom" @click="next" big>
      Next
    </q-btn>
    <!--if wechat-->
    <!--take photo button using wechat-->
    <!--if cordova-->
    <!--take photo button using coedova api-->
    <!--if web-->
    <!--show photo upload form-->

  </div>


  <!--<table class="q-table">-->
    <!--<thead>-->
    <!--<tr>-->
      <!--<th class="text-left">ID</th>-->
      <!--<th class="text-left">Tenant Name</th>-->
      <!--<th class="text-left">Status</th>-->
    <!--</tr>-->
    <!--</thead>-->
    <!--<tbody>-->
    <!--<tr>-->
      <!--<td class="text-left">A-101</td>-->
      <!--<td class="text-left">HM</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-102</td>-->
      <!--<td class="text-left">DECATHLON</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-103</td>-->
      <!--<td class="text-left">KFC</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-201</td>-->
      <!--<td class="text-left">PizzaHut</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-202</td>-->
      <!--<td class="text-left">HOLA</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-203</td>-->
      <!--<td class="text-left">KFC</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-203</td>-->
      <!--<td class="text-left">KFC</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-203</td>-->
      <!--<td class="text-left">KFC</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--<tr>-->
      <!--<td class="text-left">A-203</td>-->
      <!--<td class="text-left">KFC</td>-->
      <!--<td class="text-left">Pending</td>-->
    <!--</tr>-->
    <!--</tbody>-->
  <!--</table>-->
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QSearch,
    Dialog
  } from 'quasar'
  import PmscanAnyline from 'src/components/tri_component/pmscan_anyline.vue'
  import QrscanAnyline from 'src/components/tri_component/qrscan_anyline.vue'
  import global_ from 'src/components/global'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QSearch,
      Dialog,
      PmscanAnyline,
      QrscanAnyline
    },
    data () {
      return {
        search_text: null
      }
    },
    computed: {
      inCordova () {
        return this.$q.platform.is.cordova
      },
      inWechat () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
      }
    },
    methods: {
      next: function () {
        alert('next')
      },
      onSearch: function () {
        alert('onSearch')
      },
      onPmscan (result) {
        // Reading
        let sc = global_.scanResult
        sc.reading = result.reading
        sc.barcode = result.barcode
        sc.npv = 'normal'
        sc.photo_src = result.imagePath
        sc.tid = 0

        // Empty?
        if (!sc.barcode) {
          alert('Error: no barcode!')
        }
        if (!sc.reading) {
          alert('Error: no reading!')
        }

        // Check the meter whether it has MPV?
        let hasNPV = true
        if (hasNPV) {
          // prompt to select npv
          Dialog.create({
            title: 'Selection',
            message: 'You shoule select the npv of this scan result.',
            form: {
              option: {
                type: 'radio',
                model: 'normal',
                inline: true, // optional
                items: [
                  {label: 'Normal', value: 'normal'},
                  {label: 'Peak', value: 'peak'},
                  {label: 'Valley', value: 'valley'}
                ]
              }
            },
            buttons: [
              'Cancel',
              {
                label: 'Ok',
                handler: (data) => {
                  sc.npv = data.option
                  this.$router.push('/task/result')
                }
              }
            ]
          })
        }
        else {
          this.$router.push('/task/result')
        }
      },
      scanFake () {
        this.$router.push('/task/result')
      },
      onQrscan (result) {
        alert(result.value)
      }
    }
  }
</script>

<style>
</style>
