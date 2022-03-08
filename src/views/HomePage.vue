<template>
  <v-container>
    <v-row>
      <v-col>
        Make Chase
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link :to="{name:'GameBrowser'}">Games</router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link :to="{name:'DemoPage'}">Demo Page</router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link :to="{name:'AboutPage'}">About Page</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>