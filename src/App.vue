<template>
  <v-app>
    <v-main>
      <router-view class="main-view"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>


<style scoped>
.main-view {
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
}
</style>