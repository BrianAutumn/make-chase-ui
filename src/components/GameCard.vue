<template>
  <v-card :class="{'lobby-game':game.state === 'LOBBY','closed-game':game.state === 'CLOSED'}">
    <v-card-title>
      <v-btn class="mr-2" @click="closeGame(game._id)" v-show="showClose && game.state !== 'CLOSED'">
        Close
      </v-btn>
      <span>{{game.name}}</span>
      <span class="ml-2 subtitle-1">{{game.users[0].displayName}}</span>
    </v-card-title>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "GameCard",
  props:{
    game:{
      type:Object,
      required:true
    },
    showClose:{
      type:Boolean,
      required:false,
      default:() => false
    }
  },
  methods:{
    ...mapActions(['closeGame'])
  }
}
</script>

<style scoped>

.lobby-game {
  background-color:#ddedea
}

.closed-game {
  background-color:#fce1e4
}
</style>