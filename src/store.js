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
    mutation SendMessage($text: String!) {
        sendMessage(text: $text) {
            messageId
            text
            timestamp
            type
        }
    }
`

const MESSAGE_FEED = gql`
    subscription MessageFeed {
        messageFeed {
            messageId
            text
            timestamp
            type
        }
    }
`

const MESSAGES = gql`
    query Messages {
        messages {
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
      count: 1,
      messages:[],
      messagesLoaded:false
    }
  },
  mutations:{
    setMessages(state,messages){
      state.messages.push(...messages);
      state.messagesLoaded = true;
    },
    addMessage(state, newMessage){
      console.log('state.messages',state.messages);
      console.log('newMessage',newMessage);
      state.messages.push(newMessage);
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
    },
    async loadMessages({commit, state}){
      if(state.messagesLoaded){
        return;
      }
      commit('setMessages',(await apolloClient.query({
        query:MESSAGES
      })).data.messages)

      apolloClient.subscribe({
        query:MESSAGE_FEED
      }).subscribe((message) => {
        console.log('message',message)
        commit('addMessage',message.data.messageFeed);
      })
    }
  }
})