<template>
  <div id="app">
    <array-sort></array-sort>
  </div>
</template>

<script>
import ArraySort from './components/array_sort//ArraySort'

import Vue from 'vue'
import Element from 'element-ui'
import CodeMirror from 'vue-codemirror'

Vue.use(Element)
Vue.use(CodeMirror)

export default {
  name: 'app',
  components: {
    ArraySort
  }
}
</script>

<style lang="sass">
* {
  padding: 0;
  margin: 0;
}
html {
  background: #959595;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 40px;
}
</style>
