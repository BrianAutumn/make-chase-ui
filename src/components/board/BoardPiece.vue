<template>
  <slot name="icon" :x="node.x - width/2" :y="node.y - height" :width="width" :height="height"/>
</template>

<script>
export default {
  name: "BoardPiece",
  data(){
    return {
      width:7,
      height:7
    }
  },
  props:{
    nodes:{
      type:Object,
      required:true
    },
    location:{
      type:String,
      required:true
    }
  },
  computed:{
    node(){
      return this.nodes.find(node => node.label === this.location)
    }
  }
}
</script>

<style scoped>

</style>