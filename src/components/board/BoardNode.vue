<template>
  <g class="node">
    <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
    <circle :cx="node.x" :cy="node.y" r="2" :class="{'node-unselected':node.state === 'NONE','node-selected':node.state === 'SELECTED','node-available':node.state === 'AVAILABLE'}"/>
    <text :x="node.x" :y="node.y" :class="[{'label-unselected':node.state === 'NONE','label-selected':node.state === 'SELECTED','label-available':node.state === 'AVAILABLE'},'text-label']">{{node.label}}</text>
  </g>
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
  .node {
    cursor:pointer;
  }

  .label-unselected {
    fill:whitesmoke;
  }

  .label-selected {
    fill:black;
  }

  .label-available {
    fill:whitesmoke;
  }

  .node-unselected {
    fill:black;
  }

  .node-selected {
    fill:yellow;
  }

  .node-available {
    fill:blue;
  }

  .text-label{
    font-size: 2px;
    text-anchor: middle;
    dominant-baseline: central;
  }
</style>