<template>
  <div class="container">
    <GameStateIndicator v-if="board" :board="board" :actionCommitted="actionCommitted"/>
    <ActionCard v-if="selectedNode.label && !actionCommitted" :coords="selectedAnchor" @submit="submitAction"/>
    <svg v-if="board" ref="board" class="board-svg board" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white" />
      <BoardConnection v-for="(connection, i) of amendedConnections" :key="i" :connection="connection" :nodes="board.nodes" />
      <BoardNode v-for="node of amendedNodes" :key="node.label" :node="node" @selected="selectNode"/>
      <BoardPiece v-for="piece of board.pieces" :key="piece.label" :piece="piece" :nodes="board.nodes" />
    </svg>
  </div>
</template>

<script>
import BoardNode from "@/components/board/BoardNode";
import BoardConnection from "@/components/board/BoardConnection";
import BoardPiece from "@/components/board/BoardPiece";
import {
  QUERY_BOARD,
  QUERY_ME,
  SUBSCRIPTION_BOARD_UPDATES,
} from "@/graphql/queries";
import * as panzoom from "panzoom";
import {cloneDeep} from "@apollo/client/utilities";
import ActionCard from "@/components/board/ActionCard";
import {mapActions} from "vuex";
import GameStateIndicator from "@/components/board/GameStateIndicator";

export default {
  name: "GameBoard",
  components: {GameStateIndicator, ActionCard, BoardPiece, BoardConnection, BoardNode},
  methods:{
    ...mapActions(['makeActions']),
    selectNode(node){
      if(this.selectedNode.label === node.label){
        this.selectedNode = {}
      }else{
        this.selectedNode = node;
      }
      this.calculateSelectedAnchor()
    },
    calculateSelectedAnchor(){
      if(this.selectedNode.label){
        let board = this.$refs.board.getBoundingClientRect();
        this.selectedAnchor = {
          x:board.x + board.width * ((this.selectedNode.x - 4)/100),
          y:board.y + board.height * ((this.selectedNode.y + 4)/100)
        }
      }
    },
    submitAction(){
      this.actionCommitted = true;
      this.makeActions({gameId:this.gameId,actions:[{code: 'MOVE', args:this.selectedNode.label}]})
    }
  },
  computed:{
    gameId(){
      return this.$route.params.gameId
    },
    myRole(){
      return this?.board?.roles.find(role => role.user._id === this.me._id).role;
    },
    myTurn(){
      return this?.board?.turn === this.myRole;
    },
    myLocation(){
      return this?.board?.pieces.find(piece => piece.label === this.myRole).location;
    },
    adjacentNodes(){
      let adjacentNodes = new Set();
      for(let connection of this.board.connections){
        if(connection.nodes.includes(this.myLocation)){
          connection.nodes.forEach(node => adjacentNodes.add(node))
        }
      }
      return Array.from(adjacentNodes);
    },
    amendedNodes(){
      let amendedNodes = cloneDeep(this.board.nodes);
      for(let node of amendedNodes){
        node.state = 'NONE'
        if(!this.myTurn){
          continue
        }
        if(node.label === this.selectedNode.label){
          if(this.actionCommitted){
            node.state = 'COMMITTED'
          }else{
            node.state = 'SELECTED'
          }
          continue
        }
        if(!this.actionCommitted && this.adjacentNodes.includes(node.label)){
          node.state = 'AVAILABLE'
        }
      }
      return amendedNodes;
    },
    amendedConnections(){
      let amendedConnections = cloneDeep(this.board.connections);
      for(let connection of amendedConnections){
        connection.state = 'NONE'
        if(!this.myTurn){
          continue
        }
        if(connection.nodes.includes(this.selectedNode.label) && connection.nodes.includes(this.myLocation) && this.myLocation !== this.selectedNode.label){
          if(this.actionCommitted){
            connection.state = 'COMMITTED'
          }else{
            connection.state = 'SELECTED'
          }
          continue;
        }
        if(!this.actionCommitted && connection.nodes.includes(this.myLocation)){
          connection.state = 'AVAILABLE'
        }
      }
      return amendedConnections
    }
  },
  data(){
    return {
      moveTarget:'',
      panzoomInit:false,
      selectedNode:{},
      selectedAnchor:{},
      actionCommitted:false
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
          panzoom(this.$refs.board,{zoomDoubleClickSpeed:1,bounds:true}).on('transform', () => {
            this.calculateSelectedAnchor()
          })
        })
      }
    },
    myTurn(){
      this.actionCommitted = false;
      this.selectedNode = {}
    }
  }
}
</script>

<style scoped>
.board{
  background-color: white;
  z-index: 1;
}

.board-svg{
  z-index: 1;
}

.container{
  background-color:wheat;
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>