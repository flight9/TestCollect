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

    <q-btn @click.prevent="$router.push('/task/list')">
      <a href="/#/task/list">second link</a>
    </q-btn>
    <tri-link-btn path="/task/list" small rounded color="amber" text-small>third link(tri)</tri-link-btn>
    <q-btn path="/task/list" small rounded color="amber" text-small>third link</q-btn>

    <tri-link-btn small path="/task/list">fourth link(tri)</tri-link-btn>
    <q-btn small path="/task/list">fourth link</q-btn>


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
          <q-item-main label="Unlock Scan" sublabel="only for test" />
        </q-item>
        <q-item @click="clearResult()">
          <q-item-side icon="delete" />
          <q-item-main label="Clear Results" sublabel="only for test" />
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
  import anyline from 'src/api/tri_anyline'
  import TriLinkBtn from 'src/components/tri_component/tri_link_btn.vue'
  import { mapActions } from 'vuex'
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
      QItemMain,
      TriLinkBtn
    },
    data () {
      return {
        customer: 'Auchan',
        store: 'YP01'
      }
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
      },
      clearResult () {
        this.$refs.layout.hideCurrentSide(() => {
          if (confirm('Are you sure to clear?')) {
            this.clearResults()
            alert('Cleared!')
          }
        })
      },
      ...mapActions(['clearResults'])
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  /* card 宽度行内指定可以有效 style="width: 300px"*/
</style>
