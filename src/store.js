import {createStore} from 'vuex'
import {apolloClient, subscriptionClient} from "@/apollo";
import {
  MUTATION_CLOSE_GAME,
  MUTATION_CREATE_GAME,
  MUTATION_LOGIN,
  MUTATION_SEND_MESSAGE,
  QUERY_ME
} from "@/graphql/queries";

export const store = createStore({
  state:{
    loginDestination:null
  },
  mutations:{
    loginDestination(state, destination){
      state.loginDestination = destination;
    }
  },
  actions: {
    async login(context, jwt) {
      let result = (await apolloClient.mutate({
        mutation: MUTATION_LOGIN,
        variables: {
          jwt: JSON.stringify(jwt)
        }
      })).data.login.success;
      if (result) {
        await apolloClient.query({
          query:QUERY_ME,
          fetchPolicy:'network-only'
        });
        subscriptionClient.close(false,false);
      }
      return result;
    },
    async sendMessage() {
      await apolloClient.mutate({
        mutation: MUTATION_SEND_MESSAGE,
        variables: {
          text: 'This is a test message'
        }
      })
    },
    async createGame(context, {name}){
      return (await apolloClient.mutate({
        mutation: MUTATION_CREATE_GAME,
        variables: {
          name
        }
      })).data.createGame
    },
    async isLoggedIn(){
      return (await apolloClient.query({
        query: QUERY_ME
      })).data.me !== 'undefined';
    },
    async closeGame(context, gameId){
      return (await apolloClient.mutate({
        mutation: MUTATION_CLOSE_GAME,
        variables: {
          gameId
        }
      })).data.closeGame
    }
  }
})