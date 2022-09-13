<template>
  <g class="node">
    <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
    <circle :cx="node.x" :cy="node.y" r="2" :fill="selected?'yellow':'black'"/>
    <text :x="node.x" :y="node.y" :class="[{'label-unselected':!selected,'label-selected':selected},'text-label']">{{node.label}}</text>
  </g>
</template>

<script>
export default {
  name: "BoardNode",
  props:{
    node:{
      type:Object,
      required:true
    },
    selected:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .node {
    cursor:pointer;
  }

  .label-unselected {
    fill:whitesmoke;
  }

  .label-selected {
    fill:black;
  }

  .text-label{
    font-size: 2px;
    text-anchor: middle;
    dominant-baseline: central;
  }
</style>