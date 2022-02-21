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
const SEND_MESSAGE = gql`
    mutation Mutation($text: String!) {
        sendMessage(text: $text) {
            messageId
            text
            timestamp
            type
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
    },
    async sendMessage(){
      await apolloClient.mutate({
        mutation:SEND_MESSAGE,
        variables:{
          text:'This is a test message'
        }
      })
    }
  }
})