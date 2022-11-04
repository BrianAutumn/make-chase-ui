<template>
  <MainFrame>
    <div class="browser-container">
      <CreateGameDialog class="create-game"/>
      <v-sheet elevation="1" class="game-list">
        <GameCard class="ma-2" v-for="game of games" :key="game._id" :game="game"/>
      </v-sheet>
    </div>
  </MainFrame>
</template>

<script>
import {
  QUERY_GAMES, QUERY_ME,
  SUBSCRIPTION_GAMES_FEED,
} from "@/graphql/queries";
import {mapActions} from "vuex";
import GameCard from "@/components/GameCard";
import CreateGameDialog from "@/components/CreateGameDialog";
import MainFrame from "@/components/MainFrame";

export default {
  name: "GameBrowser",
  components: {MainFrame, CreateGameDialog, GameCard},
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
  overflow-y: auto;
  flex-basis: auto;
}

.create-game {
  flex-basis: fit-content;
}

.browser-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap:10px;
}
</style>