<template>
  <ChaserIcon v-if="piece.label === 'chaser'" :x="node.x - width/2" :y="node.y - height" :width="width" :height="height"/>
  <RunnerIcon v-else-if="piece.label === 'runner'" :x="node.x - width/2" :y="node.y - height" :width="width" :height="height"/>
</template>

<script>
import ChaserIcon from "@/components/icons/ChaserIcon";
import RunnerIcon from "@/components/icons/RunnerIcon";

export default {
  name: "BoardPiece",
  components: {ChaserIcon, RunnerIcon},
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
    piece:{
      type:String,
      required:true
    }
  },
  computed:{
    node(){
      return this.nodes.find(node => node.label === this.piece.location)
    }
  }
}
</script>

<style scoped>

</style>