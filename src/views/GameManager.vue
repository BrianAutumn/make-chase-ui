<template>
  <div class="container">
    <div class="background" :style="{'--transformX':`${((transformX / 20) % 100) - 100}vw`,'--transformY':`${((transformY / 20)  % 100) - 100}vh`}"></div>
    <GameStateIndicator v-if="board"
                        :board="board"
                        :actionsSubmitted="actionsSubmitted"
                        :current-action="casualActionName.long"
    />
    <GameBoard v-if="board"
               ref="gameBoard"
               :nodes="amendedNodes"
               :connections="amendedConnections"
               :pieces="board.pieces"
               :action-name="casualActionName.short"
               @submit="commitAction($event.target)"
               @selected:updated="this.selected = $event"
               @selectedType:updated="this.selectedType = $event"
               @transform="transform"
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
import {isMyTurn} from "@/utils/board.utils";

export default {
  name: "GameManager",
  components: {GameStateIndicator, GameBoard},
  methods: {
    ...mapActions(['makeActions']),
    commitAction(args){
      this.committedActions.push({code:this.actionState,args})
      if(this.committedActions.length === this.board?.turn.actions.length){
        this.actionsSubmitted = true;
        this.makeActions({gameId: this.gameId, actions: this.committedActions})
      }
    },
    transform(e){
      this.transformX = e.x;
      this.transformY = e.y;
    }
  },
  computed: {
    gameId() {
      return this.$route.params.gameId
    },
    myTurn() {
      return isMyTurn(this.board,this.me?._id);
    },
    actionState(){
      if(!isMyTurn(this.board,this.me._id)){
        return "NOT_TURN"
      }
      return this.board?.turn.actions[this.committedActions.length];
    },
    casualActionName(){
      return CasualActionMap[this.actionState]?CasualActionMap[this.actionState]:{short:undefined,long:undefined}
    },
    amendedNodes(){
      return getAmendedNodes({
        board:this.board,
        actionState:this.actionState,
        myUserId:this.me._id,
        selected:this.selected,
        selectedType:this.selectedType,
        actionsSubmitted:this.actionsSubmitted,
        committedActions:this.committedActions
      })
    },
    amendedConnections(){
      return getAmendedConnections({
        board:this.board,
        actionState:this.actionState,
        myUserId:this.me._id,
        selected:this.selected,
        selectedType:this.selectedType,
        actionsSubmitted:this.actionsSubmitted,
        committedActions:this.committedActions
      })
    }
  },
  data() {
    return {
      actionsSubmitted: false,
      committedActions:[],
      selected:undefined,
      selectedType:undefined,
      transformX:0,
      transformY:0
    }
  },
  apollo: {
    me: {
      query: QUERY_ME
    },
    board: {
      query: QUERY_BOARD,
      fetchPolicy: 'network-only',
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
      this.committedActions = [];
    }
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  height: 100%;
  width: 100%;
}

.background {
  position: absolute;
  z-index: -1;
  background-color: #6e6046;
  width:300vw;
  height:300vh;
  background-image: radial-gradient(#4b3f2b 3%, transparent 11%), radial-gradient(#4b3f2b 3%, transparent 11%);
  background-repeat: repeat;
  background-size: 0 0, 30px 30px;
  transform: translate(var(--transformX), var(--transformY));
}
</style>