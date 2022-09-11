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
import {mapActions} from "vuex";

export default {
  name: "GameBoard",
  components: {BoardPiece, ChaserIcon, BoardConnection, BoardNode, RunnerIcon},
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
      board:{
        pieces:{
          runner:{
            location:'B',
            $view:'runner'
          },
          chaser:{
            location:'C'
          }
        },
        nodes:[
          {
            label:'A',
            x:10,
            y:20,
          },
          {
            label:'B',
            x:30,
            y:70,
          },
          {
            label:'C',
            x:70,
            y:90
          },
          {
            label:'D',
            x:80,
            y:30
          },
          {
            label:'E',
            x:45,
            y:5
          },
          {
            label:'F',
            x:80,
            y:5
          }
        ],
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

.move {
  position: fixed;
  left: 50%;
  bottom:10%;
  z-index: 100;
}
</style>