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
            <q-btn @click="scan" small>
              <q-icon name="fullscreen" />
            </q-btn>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">
            <img src="./img/no_reading.jpg"/>
          </td>
          <td class="text-right">
            <q-btn @click="" small>
              <q-icon name="edit" />
            </q-btn>
          </td>
        </tr>
        <tr>
          <td>
            <q-input ref="reading_input" v-model.trim="manual_reading" stack-label="Reading" error
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
    props: ['reading', 'id', 'period'],
    data () {
      return {
        manual_reading: 94321.56, // this.reading
        final_reading: 94321.56, // this.reading
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
          if (this.check(this.manual_reading)) {
            this.final_reading = this.manual_reading
          }
          else {
            Alert.create({
              html: 'Error: the input is out of range!',
              color: 'error'
            })
            this.manual_reading = this.final_reading
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
        // var vm = this
        this.$http.get('https://jsonplaceholder.typicode.com/users')
          .then(function (response) {
            let users = response.data
            console.log(users)
          })
      },
      scan () {
        // anyline.myfunc()
        anyline.energy.scan('AUTO_ANALOG_DIGITAL_METER')
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
