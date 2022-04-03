<template>
  <slot name="icon" :x="nodes[location].x - width/2" :y="nodes[location].y - height" :width="width" :height="height"/>
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
  }
}
</script>

<style scoped>

</style>