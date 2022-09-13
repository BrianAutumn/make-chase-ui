<template>
  <div class="container">
    <v-card class="move" v-if="selectedNode !== ''">
      <v-card-text>
        <v-btn @click="submitMove">
          Move Here
        </v-btn>
      </v-card-text>
    </v-card>
    <svg v-if="board" ref="board" class="board" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white" />
      <BoardConnection v-for="(connection, i) of board.connections" :key="i" :connection="connection" :nodes="board.nodes" />
      <BoardNode v-for="node of amendedNodes" :key="node.label" :node="node" @click="selectNode(node.label)"/>
      <BoardPiece v-for="piece of board.pieces" :key="piece.label" :piece="piece" :nodes="board.nodes" />
    </svg>
  </div>
</template>

<script>
import BoardNode from "@/components/board/BoardNode";
import BoardConnection from "@/components/board/BoardConnection";
import BoardPiece from "@/components/board/BoardPiece";
import {mapActions} from "vuex";
import {
  QUERY_BOARD,
  QUERY_ME,
  SUBSCRIPTION_BOARD_UPDATES,
} from "@/graphql/queries";
import * as panzoom from "panzoom";
import {cloneDeep} from "@apollo/client/utilities";

export default {
  name: "GameBoard",
  components: {BoardPiece, BoardConnection, BoardNode},
  methods:{
    ...mapActions(['makeActions']),
    submitMove(){
      this.makeActions({gameId:this.gameId,actions:[{code: 'MOVE', args:this.selectedNode}]})
    },
    selectNode(node){
      if(this.selectedNode === node){
        this.selectedNode = ''
      }else{
        this.selectedNode = node;
      }
    }
  },
  computed:{
    gameId(){
      return this.$route.params.gameId
    },
    adjacentNodes(){
      let adjacentNodes = new Set();
      let myRole = this.board.roles.find(role => role.user._id === this.me._id).role;
      let myLocation = this.board.pieces.find(piece => piece.label === myRole).location;
      for(let connection of this.board.connections){
        if(connection.includes(myLocation)){
          connection.forEach(node => adjacentNodes.add(node))
        }
      }
      return Array.from(adjacentNodes);
    },
    amendedNodes(){
      let amendedNodes = cloneDeep(this.board.nodes);
      for(let node of amendedNodes){
        if(node.label === this.selectedNode){
          node.state = 'SELECTED'
          continue
        }
        if(this.adjacentNodes.includes(node.label)){
          node.state = 'AVAILABLE'
          continue
        }
        node.state = 'NONE'
      }
      return amendedNodes;
    }
  },
  data(){
    return {
      moveTarget:'',
      panzoomInit:false,
      selectedNode:''
    }
  },
  apollo: {
    me:{
      query: QUERY_ME
    },
    board:{
      query: QUERY_BOARD,
      variables() {
        return {
          gameId: this.gameId,
        }
      },
      subscribeToMore: {
        document: SUBSCRIPTION_BOARD_UPDATES,
        updateQuery: (previousResult, {subscriptionData}) => {
          return {board:subscriptionData.data.boardUpdates}
        },
        variables() {
          return {
            gameId: this.gameId,
          }
        },
      }
    }
  },
  watch:{
    board(){
      if(!this.panzoomInit){
        this.panzoomInit = true;
        this.$nextTick(() => {
          panzoom(this.$refs.board)
        })
      }
    }
  }
}
</script>

<style scoped>
.board{
  border:1px solid black;
  width:100%;
  height:100%;
}

.container{
  background-color:wheat;
}

.move {
  position: fixed;
  left: 50%;
  bottom:10%;
  z-index: 100;
}
</style>