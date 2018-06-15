<template>
  <div id="app">  
    <forma/>
  </div>
</template>




<script>
import forma from './components/forma'

export default {
  name: 'App',
  components: {
    forma
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
