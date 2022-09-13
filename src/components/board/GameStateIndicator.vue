<template>
  <div class="metadata pa-3">
    <div class="divider section pb-2 centered">
      {{board.turn.substring(0,1).toUpperCase() + board.turn.substring(1).toLowerCase()}}'s Turn
    </div>
    <div class="divider section py-2 centered action-section">
      <p v-if="myTurn && !actionCommitted">
        Make a move!
      </p>
      <v-progress-circular v-else indeterminate />
    </div>
    <div class="pt-2 section">
      <p>
        Runner: {{runnerName}}
      </p>
      <p>
        Chaser: {{chaserName}}
      </p>
    </div>
  </div>
</template>

<script>
import {QUERY_ME} from "@/graphql/queries";

export default {
  name: "GameStateIndicator",
  props:{
    board: {type:Object},
    actionCommitted: {type:Boolean}
  },
  computed:{
    myTurn(){
      let myRole = this.board.roles.find(role => role.user._id === this.me._id).role;
      return myRole === this.board.turn;
    },
    chaserName(){
      return this.board.roles.find(role => role.role === 'chaser').user.displayName
    },
    runnerName(){
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
  width: fit-content;
  min-width: 10rem;
  background-color: floralwhite;
  border-radius: 0 0 10px 0;
  z-index: 10;
  position: fixed;
}

.divider {
  border-bottom: 1px solid darkslategrey;
}

.section {
  width: 100%;
}

.action-section {
  min-height: 40px;
}

.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>