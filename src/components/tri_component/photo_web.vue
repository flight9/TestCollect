<template>
  <div>
    <input type="file" @change="processFile($event)" ref="selectedFile" style="display: none;"/>
    <input type="button" value="Browse..." @click="$refs.selectedFile.click();" />
  </div>
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
