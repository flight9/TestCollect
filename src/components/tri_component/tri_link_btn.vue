<template>
  <q-btn @click="$router.push(path)" v-bind="$attrs" v-on="$listeners" ref="btn">
    <a :href="href" :class="textClass">
      <slot></slot>
    </a>
  </q-btn>
</template>

<script>
  import {
    QBtn
  } from 'quasar'
  var triLinkBtn = {
    name: 'triLinkBtn',
    components: {
      QBtn
    },
    props: {
      path: {
        type: String,
        default: '/' // eg. /task/list
      }
    },
    inheritAttrs: false,
    data () {
      return {
        textClass: []
      }
    },
    computed: {
      href () {
        return '/#' + this.path
      }
    },
    mounted () {
      // make textClass for proper text color
      var b = this.$refs.btn
      var color = b.toggled ? b.toggleColor : b.color
      console.log(color)
      if (color) {
        if (b.flat || b.outline) {
          this.textClass.push(`text-${color}`)
        }
        else {
          this.textClass.push(`text-white`)
        }
      }
      else {
        this.textClass.push('color-inherit')
      }
    }
  }

  export default triLinkBtn
</script>

<style scoped>
  .color-inherit {
    color: inherit;
  }
</style>
