<template>
  <v-card>
    <v-card-title>
      <span>{{game.name}}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "GameCard",
  props:{
    game:{
      type:Object,
      required:true
    }
  }
}
</script>

<style scoped>

</style>