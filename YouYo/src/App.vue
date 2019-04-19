<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      result: []
    }
  },
  methods: {

  },
  watch: {
    
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: '微软雅黑'  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

/* .user {
  position: absolute;
  background: #d343f779;
  min-width: 10vw;
  min-height: 10vh;
  cursor:move;
} */


</style>
