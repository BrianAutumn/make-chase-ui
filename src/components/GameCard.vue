<template>
  <v-card
      :class="{'lobby-game':game.state === 'LOBBY','closed-game':game.state === 'CLOSED','active-game':game.state === 'ACTIVE','complete-game':game.state === 'COMPLETE'}">
    <v-card-title>
      <v-btn class="mr-2" @click="viewGame" v-show="game.state === 'ACTIVE' || game.state === 'COMPLETE'">
        View
      </v-btn>
      <v-btn class="mr-2" @click="closeGame(game._id)"
             v-show="inGame && (game.state === 'LOBBY' || game.state === 'ACTIVE')">
        Close
      </v-btn>
      <v-btn class="mr-2" @click="joinGame(game._id)"
             v-show="!inGame && game.state === 'LOBBY' && game.users.length === 1">
        Join
      </v-btn>
      <span>{{ game.name }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import {QUERY_ME} from "@/graphql/queries";

export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  apollo: {
    me: {
      query: QUERY_ME
    }
  },
  methods: {
    ...mapActions(['closeGame', 'joinGame']),
    viewGame() {
      this.$router.push({
        name: 'GameManager',
        params: {
          gameId: this.game._id
        }
      })
    }
  },
  computed: {
    inGame() {
      let vm = this;
      return !!this.game.users.find(user => user._id === vm.me._id)
    }
  }
}
</script>

<style scoped>

.lobby-game {
  background-color: #ddedea
}

.closed-game {
  background-color: #fce1e4
}

.active-game {
  background-color: #e8dff5
}

.complete-game {
  background-color: #d2ffd2;
}
</style>