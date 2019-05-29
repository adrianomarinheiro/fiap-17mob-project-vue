<template>
  <v-app id="inspire" dark>
    
    <v-toolbar app fixed clipped-right>
      <v-toolbar-title >PWA Vue - 17MOB</v-toolbar-title>
    </v-toolbar>
    <v-content >
      <v-container fluid fill-height id="app">
        <router-view/>
        
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; Adriano Mendes Marinheiro 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>
      


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

