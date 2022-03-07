import {createStore} from 'vuex'
import {apolloClient, subscriptionClient} from "@/apollo";
import {MUTATION_LOGIN, MUTATION_SEND_MESSAGE, QUERY_ME} from "@/graphql/queries";

export const store = createStore({
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
      subscriptionClient.close(false,false);
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