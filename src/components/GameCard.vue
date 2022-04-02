<template>
  <v-card :class="{'lobby-game':game.state === 'LOBBY','closed-game':game.state === 'CLOSED'}">
    <v-card-title>
      <v-btn class="mr-2" @click="closeGame(game._id)" v-show="inGame && game.state !== 'CLOSED'">
        Close
      </v-btn>
      <v-btn class="mr-2" @click="joinGame(game._id)" v-show="!inGame && game.state !== 'CLOSED'">
        Join
      </v-btn>
      <span>{{game.name}}</span>
      <span class="ml-2 subtitle-1">{{game.users[0].displayName}} v </span>
      <span v-if="game.users.length === 1">...</span>
      <span v-else>{{ game.users[1].displayName }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import {QUERY_ME} from "@/graphql/queries";

export default {
  name: "GameCard",
  props:{
    game:{
      type:Object,
      required:true
    }
  },
  apollo:{
    me:{
      query:QUERY_ME
    }
  },
  methods:{
    ...mapActions(['closeGame', 'joinGame'])
  },
  computed:{
    inGame(){
      let vm = this;
      return !!this.game.users.find(user => user._id === vm.me._id)
    }
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