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
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="add" />
      </q-btn>
    </q-toolbar>

    <q-card inline @click="$router.push('/task/list')">
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

    <!-- Right Side Panel -->
    <div slot="right">
      <q-list no-border link inset-separator>
        <q-list-header>Essential Links</q-list-header>
        <q-item @click="unlockAnyline()">
          <q-item-side icon="lock_open" />
          <q-item-main label="Unlock Anyline" sublabel="only for abnormal" />
        </q-item>
        <q-side-link item to="/others">
          <q-item-side icon="map" />
          <q-item-main label="To other page" sublabel="only for test" />
        </q-side-link>
      </q-list>
    </div>

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
    QCardActions,
    QList,
    QListHeader,
    QSideLink,
    QItem,
    QItemSide,
    QItemMain
  } from 'quasar'
  import { mapState } from 'vuex'
  import anyline from 'src/api/tri_anyline'
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
      QCardActions,
      QList,
      QListHeader,
      QSideLink,
      QItem,
      QItemSide,
      QItemMain
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
      unlockAnyline () {
        this.$refs.layout.hideCurrentSide(() => {
          anyline.unlockScan()
          alert('Unlocked!')
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  /* card 宽度行内指定可以有效 style="width: 300px"*/
</style>
