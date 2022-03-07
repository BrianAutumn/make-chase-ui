import {createStore} from 'vuex'
import {apolloClient, subscriptionClient} from "@/apollo";
import {MUTATION_LOGIN, MUTATION_SEND_MESSAGE, QUERY_ME} from "@/graphql/queries";

export const store = createStore({
  state() {
    return {
      authToken: null
    }
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    }
  },
  actions: {
    async login({dispatch}, jwt) {
      let result = (await apolloClient.mutate({
        mutation: MUTATION_LOGIN,
        variables: {
          jwt: JSON.stringify(jwt)
        }
      })).data.login.success;
      if (!result) {
        return result
      }
      await dispatch('fetchAuthToken');
      subscriptionClient.close(false,false);
    },
    async fetchAuthToken({commit}){
      commit('setAuthToken', (await apolloClient.query({
        query: QUERY_ME
      })).data.me)
    },
    async sendMessage() {
      await apolloClient.mutate({
        mutation: MUTATION_SEND_MESSAGE,
        variables: {
          text: 'This is a test message'
        }
      })
    }
  }
})