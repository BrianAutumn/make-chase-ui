<template>
  <v-container>
    <v-row>
      <v-col>
        <CreateGameDialog/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GameCard class="ma-2" v-for="game of games" :key="game._id" :game="game"/>
      </v-col>
    </v-row>
  </v-container>
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
    me:{
      query: QUERY_ME
    },
    games: {
      query: QUERY_GAMES,
      subscribeToMore: {
        document: SUBSCRIPTION_GAMES_FEED,
        updateQuery: (previousResult, {subscriptionData}) => {
          const newResult = {
            games: [...previousResult.games],
          }
          let gameUpdate = subscriptionData.data.gameFeed
          let replace = false;
          for(let i in newResult.games){
            if(newResult.games[i]._id === gameUpdate._id){
              replace = true;
              newResult.games[i] = gameUpdate;
              break;
            }
          }
          if(!replace){
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

</style>