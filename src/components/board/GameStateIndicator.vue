<template>
  <div class="metadata pa-3">
    {{turn.substring(0,1).toUpperCase() + turn.substring(1).toLowerCase()}}'s Turn
  </div>
</template>

<script>
export default {
  name: "GameStateIndicator",
  props:{
    turn: {type:String}
  }
}
</script>

<style scoped>
.metadata {
  width: fit-content;
  background-color: floralwhite;
  border-radius: 0 0 10px 0;
  z-index: 10;
  position: fixed;
}
</style>