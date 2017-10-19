<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>

    <div id="main-div" class="bg-lime-3 round-borders">
      <table class="q-table">
        <thead>
        <tr>
          <th class="text-left" width="90%">Normal</th>
          <th class="text-right">
            <q-btn @click="" small>
              <q-icon name="fullscreen" />
            </q-btn>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">
            <img src="http://lorempixel.com/250/200/technics"/>
          </td>
          <td class="text-right">
            <q-btn @click="" small>
              <q-icon name="edit" />
            </q-btn>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <q-input ref="reading_input" v-model.trim="manual_reading" stack-label="Reading" type="number" :readonly="!reading_editing" />
          </td>
          <td class="text-right">
            <q-btn @click="toggleReadingEdit" small>
              <q-icon name="edit" />
            </q-btn>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <q-btn color="primary" class="full-width fixed-bottom" @click="complete" big>
      Complete
    </q-btn>
  </div>
</template>

<script>
  import {
    QBtn,
    QIcon,
    QInput
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QIcon,
      QInput
    },
    props: ['scan_reading'],
    data () {
      return {
        manual_reading: 1234.56, // scan_reading
        reading_editing: false
      }
    },
    methods: {
      toggleReadingEdit: function () {
        this.reading_editing = !this.reading_editing
        if (this.reading_editing) {
          this.$refs.reading_input.select()
        }
      },
      complete: function () {
        alert('complete')
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
