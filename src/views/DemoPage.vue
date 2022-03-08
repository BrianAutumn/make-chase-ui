<template>
  <v-container>
    <v-row>
      <v-col>
        Demo Page
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link :to="{name:'Home'}">Return</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DemoPage"
}
</script>

<style scoped>

</style>