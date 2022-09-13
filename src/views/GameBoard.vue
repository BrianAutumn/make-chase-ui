<template>
  <div class="container">
    <v-card class="move">
      <v-card-text>
        <v-text-field label="Space" v-model="moveTarget">
        </v-text-field>
        <v-btn @click="submitMove">
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
    <svg ref="board" class="board" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white" />
      <BoardConnection v-for="(connection, i) of board.connections" :key="i" :connection="connection" :nodes="board.nodes" />
      <BoardNode v-for="node of board.nodes" :key="node.label" :node="node"/>
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

export default {
  name: "GameBoard",
  components: {BoardPiece, BoardConnection, BoardNode},
  mounted(){
    panzoom(this.$refs.board)
  },
  methods:{
    ...mapActions(['makeMove']),
    submitMove(){
      this.makeMove({gameId:this.gameId,actions:[{code: 'MOVE', args:this.moveTarget}]})
    }
  },
  computed:{
    gameId(){
      return this.$route.params.gameId
    }
  },
  data(){
    return {
      moveTarget:'',
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
          return subscriptionData.data.BoardUpdates.board
        },
        variables() {
          return {
            gameId: this.gameId,
          }
        },
      }
    }
  },
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