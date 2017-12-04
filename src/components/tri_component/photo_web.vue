<template>
  <input type="file" @change="processFile($event)">
</template>

<script>
  export default {
    name: 'photoWeb',
    props: {
    },
    data () {
      return {}
    },
    methods: {
      processFile (event) {
        let fileRef = event.target.files[0]
        if (fileRef) {
          this.$emit('success', {fileRef})
        }
        else {
          let message = 'No file selected.'
          this.$emit('fail', {message})
        }
      }
    }
  }
</script>

<style>
</style>
