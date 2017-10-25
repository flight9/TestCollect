<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout
      ref="layout"
      view="lHh Lpr fff"
      :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header">
      <q-btn flat @click="leftMenu">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title class="text-center">
        Auchan YP01 Programs
      </q-toolbar-title>
      <q-btn flat @click="rightMenu">
        <q-icon name="add" />
      </q-btn>
    </q-toolbar>

    <q-card inline @click="$router.push('/task/123/peak/result')">
      <q-card-media>
        <img src="./img/program-1.jpg">
        <q-card-title slot="overlay">
          Tenant Utility Recording
          <span slot="subtitle">Subtitle</span>
          <div slot="right" class="row items-center">
            <q-icon name="filter_1" color="red" />
          </div>
        </q-card-title>
      </q-card-media>
      <!--<q-card-separator />-->
      <!--<q-card-main>-->
        <!--Card Content-->
      <!--</q-card-main>-->
    </q-card>

    <!--<router-view />-->


  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QCardActions
  } from 'quasar'
  import { mapState } from 'vuex'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QCard,
      QCardTitle,
      QCardMain,
      QCardMedia,
      QCardActions
    },
    data () {
      return {
        customer: 'Auchan',
        store: 'YP01'
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      leftMenu: function () {
        alert('leftMenu')
      },
      rightMenu: function () {
        alert('rightMenu')
      }
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  /* card 宽度行内指定可以有效 style="width: 300px"*/
</style>
