<template>
  <div class="container">
    <svg ref="board" class="board" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white" />
      <BoardConnection v-for="(connection, i) of board.connections" :key="i" :connection="connection" :nodes="board.nodes" />
      <BoardNode v-for="(node, label) of board.nodes" :key="label" :node="node"/>
      <BoardPiece :location="board.pieces.chaser.location" :nodes="board.nodes">
        <template v-slot:icon="slotProps">
          <ChaserIcon v-bind="slotProps"/>
        </template>
      </BoardPiece>
      <BoardPiece :location="board.pieces.runner.location" :nodes="board.nodes">
        <template v-slot:icon="slotProps">
          <RunnerIcon v-bind="slotProps"/>
        </template>
      </BoardPiece>
    </svg>
  </div>
</template>

<script>
import * as panzoom from "panzoom";
import BoardNode from "@/components/board/BoardNode";
import BoardConnection from "@/components/board/BoardConnection";
import ChaserIcon from "@/components/icons/ChaserIcon";
import RunnerIcon from "@/components/icons/RunnerIcon";
import BoardPiece from "@/components/board/BoardPiece";

export default {
  name: "GameBoard",
  components: {BoardPiece, ChaserIcon, BoardConnection, BoardNode, RunnerIcon},
  mounted(){
    panzoom(this.$refs.board)
  },
  data(){
    return {
      board:{
        pieces:{
          runner:{
            location:'B',
            $view:'runner'
          },
          chaser:{
            location:'F'
          }
        },
        nodes:{
          A:{
            x:10,
            y:20,
          },
          B:{
            x:30,
            y:70,
          },
          C:{
            x:70,
            y:90
          },
          D:{
            x:80,
            y:30
          },
          E:{
            x:45,
            y:5
          },
          F:{
            x:80,
            y:5
          }
        },
        connections:[
          ['A','B'],
          ['B','C'],
          ['C','A'],
          ['D','C'],
          ['A','E'],
          ['E','D'],
          ['E','F']
        ]
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
</style>