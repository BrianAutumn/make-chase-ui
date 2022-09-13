<template>
  <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" :class="connectionClass" stroke="black" stroke-width="0.5" />
</template>

<script>
export default {
  name: "BoardConnection",
  props:{
    nodes:{
      type:Array,
      required:true
    },
    connection:{
      type:Object,
      required:true
    }
  },
  computed:{
    from(){
      return this.nodes.find(node => node.label === this.connection.nodes[0])
    },
    to(){
      return this.nodes.find(node => node.label === this.connection.nodes[1])
    },
    connectionClass(){
      return [`connection-${this.connection.state.toLowerCase()}`]
    }
  }
}
</script>

<style scoped>
.connection-none {
  stroke:black;
}

.connection-selected {
  stroke:yellow;
}

.connection-available {
  stroke: blue;
}
</style>