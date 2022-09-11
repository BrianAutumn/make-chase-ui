<template>
  <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" stroke="black" stroke-width="0.5" />
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
      type:Array,
      required:true
    }
  },
  computed:{
    from(){
      return this.nodes.find(node => node.label === this.connection[0])
    },
    to(){
      return this.nodes.find(node => node.label === this.connection[1])
    }
  }
}
</script>

<style scoped>

</style>