<template>
  <div :class="[{'indicator-grid-desktop':$vuetify.display.mdAndUp,'indicator-grid-mobile':$vuetify.display.smAndDown},'indicator-grid','elevation-3']">
    <div class="player-names">
      <p>
        Runner: {{ runnerName }}
      </p>
      <p>
        Chaser: {{ chaserName }}
      </p>
    </div>
    <div class="turn-count">
      <p>
        Turn {{board.turn.count}}
      </p>
    </div>
    <div class="current-turn">
      <p v-if="!board.victory">
        {{ currentTurnName }}'s Turn
      </p>
      <p v-else>
        {{ board.roles.find(role => role.role === board.victory).user.displayName }} Won!
      </p>
    </div>
    <div class="current-action">
      <div v-if="!board.victory">
        <p v-if="myTurn && !actionsSubmitted">
          {{ currentAction }}
        </p>
        <v-progress-circular v-else indeterminate/>
      </div>
    </div>
  </div>
</template>

<script>
import {QUERY_ME} from "@/graphql/queries";
import {isMyTurn} from "@/utils/board.utils";

export default {
  name: "GameStateIndicator",
  props: {
    board: {type: Object},
    currentAction: {type: String, default:'Make a move!'},
    actionsSubmitted: {type: Boolean}
  },
  computed: {
    myTurn() {
      return isMyTurn(this.board,this.me._id);
    },
    currentTurnName(){
      let turnRole = this.board.turn.role;
      return turnRole.substring(0, 1).toUpperCase() + turnRole.substring(1).toLowerCase()
    },
    chaserName() {
      return this.board.roles.find(role => role.role === 'chaser').user.displayName
    },
    runnerName() {
      return this.board.roles.find(role => role.role === 'runner').user.displayName
    }
  },
  apollo: {
    me: {
      query: QUERY_ME
    }
  }
}
</script>

<style scoped>
.metadata {
  width: min-content;
  background-color: floralwhite;
  z-index: 10;
  position: fixed;
}

.player-names {
  grid-area: player-names;
}

.turn-count {
  grid-area: turn-count;
}

.current-turn {
  grid-area: current-turn;
}

.current-action {
  grid-area: current-action;
}

.indicator-grid {
  background-color: floralwhite;
  z-index: 10;
  display: grid;
  position: absolute;
  padding: 5px 10px;
  justify-items: center;
  align-items: center;
  text-align: center;
}

.indicator-grid-mobile {
  width:100%;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
   "player-names player-names player-names"
   "turn-count current-turn current-action"
}

.indicator-grid-desktop {
  min-width: 20rem;
  border-radius: 0 0 10px 0;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
   "player-names"
   "turn-count"
   "current-turn"
   "current-action";
}

div.indicator-grid-desktop > div:nth-child(n+2){
  border-top: black solid 1px;
}
div.indicator-grid-desktop > div:nth-child(n){
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

div.indicator-grid-mobile > div:nth-child(n+3){
  border-left: black solid 1px;
  width: 100%;
  height: 90%;
}
div.indicator-grid-mobile > div:nth-child(1){
  padding-bottom: 10px;
}
div.indicator-grid-mobile > div:nth-child(n){
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

</style>