import {createStore} from 'vuex'
import {apolloClient} from "@/apollo";
import {gql} from '@apollo/client/core'

const LOGIN = gql`
    mutation Login($jwt: String!) {
        login(jwt: $jwt) {
            success
        }
    }
`

export const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  actions: {
    async login(context, jwt) {
      return (await apolloClient.mutate({
        mutation:LOGIN,
        variables:{
          jwt:JSON.stringify(jwt)
        }
      })).data.success;
    }
  }
})