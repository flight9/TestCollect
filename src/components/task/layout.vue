<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout
      ref="layout"
      view="lHh Lpr fff"
      :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header">
      <q-btn flat @click="goback">
        <q-icon name="keyboard_backspace" />
      </q-btn>
      <q-toolbar-title class="text-center">
        Trifocus - {{store_name}}
      </q-toolbar-title>
      <q-btn flat @click="upload">
        <q-icon name="vertical_align_top" />
      </q-btn>
      <q-btn flat @click="scancode">
        <q-icon name="fullscreen" />
      </q-btn>
    </q-toolbar>






    <!-- Navigation Tabs
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/layout/about" replace hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/layout/toolbar" replace hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" />
    </q-tabs>
    -->

    <!-- Left Side Panel
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item>
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item>
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </div>
    -->

    <!-- Right Side Panel
    <div slot="right">
      ...
    </div>
    -->

    <router-view />

    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->
    <!--<q-btn slot="footer" color="primary" class="full-width fixed-bottom" @click="complete" big>-->
      <!--Footer-->
    <!--</q-btn>-->
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon
  } from 'quasar'
  import { mapState } from 'vuex'
  import connection from 'src/api/tri_connection'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon
    },
    data () {
      return {
        store_name: 'store A'
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      goback: function () {
        this.$router.go(-1)
        // window.history.go(-1)
      },
      upload: function () {
        connection.checkConnection()
        alert(connection.isConnecting() ? 'true' : 'false')
      },
      scancode: function () {
        alert('scancode')
      }
    }
  }
</script>

<style>
</style>
