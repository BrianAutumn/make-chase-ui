import {createStore} from 'vuex'
import {apolloClient} from "@/apollo";
import {MUTATION_LOGIN, MUTATION_SEND_MESSAGE} from "@/graphql/queries";

export const store = createStore({
  state() {
    return {
    }
  },
  mutations:{
  },
  actions: {
    async login(context, jwt) {
      return (await apolloClient.mutate({
        mutation:MUTATION_LOGIN,
        variables:{
          jwt:JSON.stringify(jwt)
        }
      })).data.success;
    },
    async sendMessage(){
      await apolloClient.mutate({
        mutation:MUTATION_SEND_MESSAGE,
        variables:{
          text:'This is a test message'
        }
      })
    }
  }
})