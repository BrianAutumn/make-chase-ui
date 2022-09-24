<template>
  <div class="main-wrapper">
    <div class="main-container">
      <CreateGameDialog/>
      <v-sheet elevation="1" class="game-list">
        <GameCard class="ma-2" v-for="game of games" :key="game._id" :game="game"/>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import {
  QUERY_GAMES, QUERY_ME,
  SUBSCRIPTION_GAMES_FEED,
} from "@/graphql/queries";
import {mapActions} from "vuex";
import GameCard from "@/components/GameCard";
import CreateGameDialog from "@/components/CreateGameDialog";

export default {
  name: "GameBrowser",
  components: {CreateGameDialog, GameCard},
  apollo: {
    me: {
      query: QUERY_ME
    },
    games: {
      query: QUERY_GAMES,
      fetchPolicy: 'network-only',
      subscribeToMore: {
        document: SUBSCRIPTION_GAMES_FEED,
        updateQuery: (previousResult, {subscriptionData}) => {
          const newResult = {
            games: [...previousResult.games],
          }
          let gameUpdate = subscriptionData.data.gameFeed
          let replace = false;
          for (let i in newResult.games) {
            if (newResult.games[i]._id === gameUpdate._id) {
              replace = true;
              newResult.games[i] = gameUpdate;
              break;
            }
          }
          if (!replace) {
            newResult.games.push(gameUpdate);
          }
          return newResult
        },
      }
    }
  },
  methods: {
    ...mapActions(['sendMessage'])
  }
}
</script>

<style scoped>
.game-list {
  overflow-y: scroll;
  margin-top: 10px;
  padding: 10px;
  max-height: 90vh;
  max-width: 1000px;
  min-width: 800px;
}

.main-container {
  margin: auto;
  padding-top: 10px;
  width: fit-content;
}

.main-wrapper {
  background-color: #fffbe0;
  width: 100vw;
  height: 100vh;
}
</style>