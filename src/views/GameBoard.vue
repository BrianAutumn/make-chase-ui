<template>
  <div>
    <ActionCard v-if="selectedType !== ''"
                :coords="selectedAnchor"
                :action-label="actionName"
                @submit="submitAction"/>
    <svg ref="board" class="board-svg board" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <BoardConnection v-for="(connection, i) of connections"
                       :key="i"
                       :connection="connection"
                       :nodes="nodes" @selected="selectConnection"/>
      <BoardNode v-for="node of nodes"
                 :key="node.label"
                 :node="node"
                 @selected="selectNode"/>
      <BoardPiece v-for="piece of pieces"
                  :key="piece.label"
                  :piece="piece"
                  :nodes="nodes"/>
    </svg>
  </div>

</template>

<script>
import ActionCard from "@/components/board/ActionCard";
import BoardPiece from "@/components/board/BoardPiece";
import BoardConnection from "@/components/board/BoardConnection";
import BoardNode from "@/components/board/BoardNode";
import panzoom from "panzoom";

export default {
  name: "GameBoard",
  components: {ActionCard, BoardPiece, BoardConnection, BoardNode},
  props: {
    connections: {type: Array},
    pieces: {type: Array},
    nodes: {type: Array},
    actionName: {type: String, default:'Submit'}
  },
  data() {
    return {
      selected: undefined,
      selectedType:'',
      selectedAnchor:{x:0,y:0}
    }
  },
  mounted(){
    panzoom(this.$refs.board, {
      zoomDoubleClickSpeed: 1,
      bounds: true
    }).on('transform', () => {
      this.calculateSelectedAnchor()
    })
  },
  methods:{
    selectNode(node){
      if(node === this.selected){
        this.selected = undefined;
        this.selectedType = '';
      }else{
        this.selected = node;
        this.selectedType = 'NODE';
      }
    },
    cancelSelected(){
      this.selected = undefined;
      this.selectedType = '';
    },
    selectConnection(connection){
      if(connection === this.selected){
        this.selected = undefined;
        this.selectedType = '';
      }else{
        this.selected = connection;
        this.selectedType = 'CONNECTION';
      }
    },
    submitAction(){
      if(this.selectedType === 'NODE'){
        this.$emit('submit', {
          type:this.selectedType,
          target:JSON.stringify(this.selected.label)
        })
      }else if(this.selectedType === 'CONNECTION'){
        this.$emit('submit', {
          type:this.selectedType,
          target:JSON.stringify(this.selected.nodes)
        })
      }
      this.selected = undefined;
      this.selectedType = '';
    },
    calculateSelectedAnchor(){
      let board = this.$refs.board.getBoundingClientRect();
      let origWidth = 100;
      let origHeight = 100;
      this.selectedAnchor = {
        x:0,
        y:0
      }
      if(this.selectedType === 'NODE'){
        this.selectedAnchor = {
          x: this.selected.x + 2,
          y: this.selected.y + 2
        }
      }
      if(this.selectedType === 'CONNECTION'){
        let a = this.nodes.find(node => node.label === this.selected.nodes[0]);
        let b = this.nodes.find(node => node.label === this.selected.nodes[1]);
        this.selectedAnchor = {
          x: (Math.abs(a.x - b.x) / 2) + Math.min(a.x,b.x) + 1,
          y: (Math.abs(a.y - b.y) / 2) + Math.min(a.y,b.y) + 1
        }
      }
      this.selectedAnchor = {
        x:board.x + board.width * (this.selectedAnchor.x / origWidth),
        y:board.y + board.height * (this.selectedAnchor.y / origHeight)
      }
    }
  },
  watch:{
    selected(){
      this.calculateSelectedAnchor();
      this.$emit('selected:updated',this.selected);
    },
    selectedType(){
      this.$emit('selectedType:updated',this.selected);
    }
  }
}
</script>

<style scoped>

</style>