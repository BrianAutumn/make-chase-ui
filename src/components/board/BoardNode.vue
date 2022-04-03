<template>
  <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
  <circle :cx="node.x" :cy="node.y" r="2" fill="black"/>
</template>

<script>
export default {
  name: "BoardNode",
  props:{
    node:{
      type:Object,
      required:true
    }
  }
}
</script>

<style scoped>

</style>