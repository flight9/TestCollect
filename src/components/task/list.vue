<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding group">
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
      <qrscan-anyline @success="onQrscan" icon="camera_alt"></qrscan-anyline>
    </div>
    <!--这个Next按钮显示下Table下面<q-btn color="primary" class="full-width fixed-bottom" @click="next" big>-->
      <!--Next-->
    <!--</q-btn>-->
    <!--if wechat-->
    <!--take photo button using wechat-->
    <!--if cordova-->
    <!--take photo button using coedova api-->
    <!--if web-->
    <!--show photo upload form-->

    <q-data-table
      :data="allResults"
      :config="tableConfig"
      :columns="tableColumns"
      @refresh="refresh"
      @rowclick="rowClick"
    >
      <template slot="col-npv" slot-scope="cell">
        {{NPVLabel(cell.data)}}
      </template>
      <template slot='col-timestamp' slot-scope='cell'>
        {{formatDate(cell.data)}}
      </template>
    </q-data-table>

    <q-modal ref="detailModal" :content-css="{padding: '30px', minWidth: '50vw'}">
      <h5>Detail Result</h5>
      <div class="group">
        <p>No. {{pm_no}} ({{NPVLabel(npv, false)}})</p>
        <img :src="photo_src" class="responsive"/>
        <p>photo_src: {{photo_src}}</p>
        <p>Reading: {{reading}}</p>
        <p>Comment: {{comment}}</p>
        <p>Time: {{datetime}}</p>
      </div>
      <q-btn color="primary" @click="$refs.detailModal.close()">Close</q-btn>
    </q-modal>
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
    Dialog,
    QDataTable,
    QModal,
    date
  } from 'quasar'
  import PmscanAnyline from 'src/components/tri_component/pmscan_anyline.vue'
  import QrscanAnyline from 'src/components/tri_component/qrscan_anyline.vue'
  import global_ from 'src/components/global'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QSearch,
      Dialog,
      QDataTable,
      QModal,
      PmscanAnyline,
      QrscanAnyline
    },
    data () {
      return {
        search_text: null,
        tableConfig,
        tableColumns,
        table,
        pm_no: '',
        npv: '',
        photo_src: '',
        reading: 0,
        comment: '',
        datetime: ''
      }
    },
    computed: {
      inCordova () {
        return this.$q.platform.is.cordova
      },
      inWechat () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
      },
      ...mapGetters([
        'allResults'
      ])
    },
    methods: {
      next: function () {
        alert('next')
      },
      onSearch: function () {
        if (this.search_text === '1111') {
          this.scanFake()
        }
        else {
          alert('onSearch')
        }
      },
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 2000)
      },
      rowClick (row) {
        this.pm_no = row.pm_no
        this.npv = row.npv
        this.photo_src = row.photo_src
        this.reading = row.reading
        this.comment = row.comment
        this.datetime = this.formatDateTime(row.timestamp)
        this.$refs.detailModal.open()
      },
      onPmscan (result) {
        // Reading
        let sc = global_.scanResult
        sc.reset()
        sc.reading = result.reading
        sc.pm_no = result.barcode
        sc.npv = 1
        global_.moveFilePersistent(result.imagePath)
          .then((url) => {
            sc.photo_src = url // 转跳最好放在这之后，否则先转跳的话图拿不到
          })

        // Empty?
        if (!sc.pm_no) {
          alert('Error: no barcode!')
        }
        if (!sc.reading) {
          alert('Error: no reading!')

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
                  model: 1,
                  inline: true, // optional
                  items: [
                    {label: 'Normal', value: 1},
                    {label: 'Peak', value: 2},
                    {label: 'Valley', value: 4}
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
        }
      },
      scanFake () {
        this.$router.push('/task/result')
      },
      onQrscan (result) {
        // Reading
        let sc = global_.scanResult
        sc.reset()
        sc.pm_no = result.value
        sc.npv = 1
        global_.moveFilePersistent(result.imagePath)
          .then((url) => {
            sc.photo_src = url
            this.$router.push('/task/result')
          })
      },
      formatDate (timestamp) {
        if (timestamp) {
          return date.formatDate(timestamp, 'YYYY/MM/DD')
        }
        else {
          return 'N/A'
        }
      },
      formatDateTime (timestamp) {
        if (timestamp) {
          return date.formatDate(timestamp, 'YYYY/MM/DD HH:mm:ss')
        }
        else {
          return 'N/A'
        }
      }
    }
  }

  var tableConfig = {
    rowHeight: '50px',
    title: false,
    noHeader: false,
    refresh: false,
    columnPicker: false,
    leftStickyColumns: 0,
    // "minHeight", "maxHeight" or "height" are important(Me: not including header/footer)
    bodyStyle: {
      height: '350px' // if empty, the height is auto
    },
    responsive: false,
    // pagination: {
    //   rowsPerPage: 10,
    //   options: [10]
    // },
    // selection: 'multiple', // or 'single'
    messages: {
      noData: '[No data available.]',
      noDataAfterFiltering: '[No results. Please refine your search terms.]'
    },
    labels: {
      columns: '列',
      allCols: '所有列',
      rows: '行',
      selected: {
        singular: '选中一项.',
        plural: '选中多项.'
      },
      clear: '清空',
      search: '查找',
      all: '所有'
    }
  }

  var tableColumns = [
    {
      label: 'PM No',
      field: 'pm_no',
      width: '60px',
      filter: false,
      sort: true,
      type: 'string'
    },
    {
      label: 'NPV',
      field: 'npv',
      width: '20px',
      filter: false,
      sort: false,
      type: 'number'
    },
    {
      label: 'Reading',
      field: 'reading',
      width: '40px',
      filter: false,
      sort: false,
      type: 'number'
    },
    {
      label: 'Date',
      field: 'timestamp',
      width: '45px',
      filter: false,
      sort: false,
      type: 'date'
    }
  ]

  var table = [
    { // Note: format may have changed
      pm_no: 'PM-40183513',
      npv: 1,
      reading: '12345678.01',
      comment: '',
      timestamp: 0
    }
  ]
</script>

<style>
</style>
