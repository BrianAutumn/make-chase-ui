<template>
  <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
  <circle :cx="node.x" :cy="node.y" r="2" fill="black"/>
  <text :x="node.x" :y="node.y" class="node-label">{{node.label}}</text>
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
  .node-label {
    font-size: 2px;
    fill:whitesmoke;
    text-anchor: middle;
    dominant-baseline: central;
  }
</style>