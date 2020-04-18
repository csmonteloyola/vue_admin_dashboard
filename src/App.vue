<template>
  <v-app id="inspire">
   <Navbar/>

   <v-content class="mx-5">
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

  export default {
    components: { Navbar },
    name: 'App',
    props: {
    },
    data: () => ({
    }),
  }
</script>