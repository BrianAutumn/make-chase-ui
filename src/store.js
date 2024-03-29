import {createStore} from 'vuex'
import {apolloClient, subscriptionClient} from "@/apollo";
import {
  MUTATION_CLOSE_GAME,
  MUTATION_CREATE_GAME, MUTATION_JOIN_GAME,
  MUTATION_LOGIN, MUTATION_MAKE_ACTIONS,
  MUTATION_SEND_MESSAGE,
  QUERY_ME
} from "@/graphql/queries";

export const store = createStore({
  state: {
    loginDestination: null,
    loggedIn:false
  },
  mutations: {
    loginDestination(state, destination) {
      state.loginDestination = destination;
    },
    setLoggedIn(state, loggedIn){
      state.loggedIn = loggedIn;
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
          query: QUERY_ME,
          fetchPolicy: 'network-only'
        });
        subscriptionClient.close(false, false);
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
    async createGame(context, {name,map}) {
      return (await apolloClient.mutate({
        mutation: MUTATION_CREATE_GAME,
        variables: {
          name,
          map
        }
      })).data.createGame
    },
    async makeActions(context, {gameId, actions}) {
      return (await apolloClient.mutate({
        mutation: MUTATION_MAKE_ACTIONS,
        variables: {
          gameId,
          actions
        }
      }))
    },
    async isLoggedIn() {
      try {
        return (await apolloClient.query({
          query: QUERY_ME
        })).data.me !== 'undefined';
      } catch (e){
        console.log(e);
        return false;
      }
    },
    async closeGame(context, gameId) {
      return (await apolloClient.mutate({
        mutation: MUTATION_CLOSE_GAME,
        variables: {
          gameId
        }
      })).data.closeGame
    },
    async joinGame(context, gameId) {
      return (await apolloClient.mutate({
        mutation: MUTATION_JOIN_GAME,
        variables: {
          gameId
        }
      })).data.joinGame
    }
  }
})