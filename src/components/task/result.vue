<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding" ref="page">
    <h6 class="text-center">A-101,HM,Electricity - DEC,2017</h6>
    <h6 class="text-center">id: {{id}}</h6>

    <div id="main-div" class="bg-lime-3 round-borders">
      <table class="q-table">
        <thead>
        <tr>
          <th class="text-left capitalize" width="90%">{{period}}</th>
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
            <img src="./img/no_reading.jpg"/>
            <!--<img src="http://lorempixel.com/250/200/technics"/>-->
          </td>
          <td class="text-right">
            <q-btn @click="" small>
              <q-icon name="edit" />
            </q-btn>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <q-input ref="reading_input" v-model.trim="manual_reading" stack-label="Reading"
                     type="number" :readonly="!reading_editing" @click="inputClick"
            />
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
    scroll
  } from 'quasar'
  const { getScrollTarget, setScrollPosition } = scroll
  export default {
    components: {
      QBtn,
      QIcon,
      QInput
    },
    props: ['scan_reading', 'id', 'period'],
    data () {
      return {
        manual_reading: 84321.56, // scan_reading
        reading_editing: false,
        footer_show: true
      }
    },
    methods: {
      toggleReadingEdit: function () {
        this.reading_editing = !this.reading_editing
        if (this.reading_editing) {
          this.$refs.reading_input.select()
          this.footer_show = false
        }
        else {
          this.footer_show = true
        }
      },
      inputClick () {
        console.log('click8')
        // codes here is for bug: keyboard will cover the input element
        let page = getScrollTarget(this.$refs.reading_input.$el)
        setScrollPosition(page, 1000, 500) // 1000 is a number big enough
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
