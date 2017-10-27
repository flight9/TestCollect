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
          console.log('acting')
        }
      }]"
    />
    <q-btn @click="scan">
      <q-icon name="fullscreen" />
    </q-btn>
    <q-btn color="primary" class="full-width fixed-bottom" @click="next" big>
      Next
    </q-btn>
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
    QSearch
  } from 'quasar'
  import anyline from 'src/api/tri_anyline'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QSearch
    },
    data () {
      return {
        search_text: null,
        search_action: [{
          icon: 'search',
          handler: 'search'
        }]
      }
    },
    methods: {
      next: function () {
        alert('next')
      },
      searchIt: function () {
        alert('search')
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
        let sc = this.$parent.$parent.scan_result
        sc.reading = result.reading
        sc.barcode = detailsBarcodes
        sc.photo_src = result.imagePath
        sc.tid = 0

        if (!sc.barcode) {
          alert('Error: no barcode!')
          return
        }

        if (!sc.reading) {
          alert('Error: no reading!')
          return
        }

        // prompt to select npv

        this.$router.push('/task/result')
      }
    }
  }
</script>

<style>
</style>
