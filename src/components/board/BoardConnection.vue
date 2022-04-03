<template>
  <line :x1="nodes[connection[0]].x" :y1="nodes[connection[0]].y" :x2="nodes[connection[1]].x" :y2="nodes[connection[1]].y" stroke="black" stroke-width="0.5" />
</template>

<script>
export default {
  name: "BoardConnection",
  props:{
    nodes:{
      type:Object,
      required:true
    },
    connection:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>

</style>