<template>
  <div class="container">
    <GameStateIndicator v-if="board" :board="board" :actionCommitted="actionsSubmitted"/>
    <GameBoard v-if="board"
               ref="gameBoard"
               :nodes="amendedNodes"
               :connections="amendedConnections"
               :pieces="board.pieces"
               :action-name="casualActionName.short"
               @submit="commitAction($event.target)"
               @selected:updated="this.selected = $event"
               @selectedType:updated="this.selectedType = $event"
    />
  </div>
</template>

<script>
import {
  QUERY_BOARD,
  QUERY_ME,
  SUBSCRIPTION_BOARD_UPDATES,
} from "@/graphql/queries";
import {mapActions} from "vuex";
import GameStateIndicator from "@/components/board/GameStateIndicator";
import GameBoard from "@/views/GameBoard";
import {CasualActionMap} from "@/utils/casual-action-map";
import {getAmendedConnections, getAmendedNodes} from "@/utils/board-state.utils";

export default {
  name: "GameManager",
  components: {GameStateIndicator, GameBoard},
  methods: {
    ...mapActions(['makeActions']),
    commitAction(args){
      this.committedActions.push({action:this.actionState,args})
      if(this.committedActions.length === this.board?.turn.actions.length){
        this.actionsSubmitted = true;
        this.makeActions({gameId: this.gameId, actions: [{code: 'MOVE', args: this.selectedNode.label}]})
      }
    }
  },
  computed: {
    gameId() {
      return this.$route.params.gameId
    },
    actionState(){
      if(!this.myTurn){
        return "NOT_TURN"
      }
      return this.board?.turn.actions[this.committedActions.length];
    },
    casualActionName(){
      return CasualActionMap[this.actionState]?CasualActionMap[this.actionState]:{short:''}
    },
    amendedNodes(){
      return getAmendedNodes({
        board:this.board,
        actionState:this.actionState,
        myUserId:this.me._id,
        selected:this.selected,
        selectedType:this.selectedType,
        actionSubmitted:this.actionSubmitted
      })
    },
    amendedConnections(){
      return getAmendedConnections({
        board:this.board,
        actionState:this.actionState,
        myUserId:this.me._id,
        selected:this.selected,
        selectedType:this.selectedType,
        actionSubmitted:this.actionSubmitted
      })
    }
  },
  data() {
    return {
      actionsSubmitted: false,
      committedActions:[],
      selected:undefined,
      selectedType:undefined
    }
  },
  apollo: {
    me: {
      query: QUERY_ME
    },
    board: {
      query: QUERY_BOARD,
      variables() {
        return {
          gameId: this.gameId,
        }
      },
      subscribeToMore: {
        document: SUBSCRIPTION_BOARD_UPDATES,
        updateQuery: (previousResult, {subscriptionData}) => {
          return {board: subscriptionData.data.boardUpdates}
        },
        variables() {
          return {
            gameId: this.gameId,
          }
        },
      }
    }
  },
  watch: {
    myTurn() {
      this.actionsSubmitted = false;
      this.$refs.gameBoard.cancelSelected();
    }
  }
}
</script>

<style scoped>
.board {
  background-color: white;
  z-index: 1;
}

.board-svg {
  z-index: 1;
}

.container {
  background-color: wheat;
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>