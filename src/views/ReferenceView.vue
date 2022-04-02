<template>
  <v-container>
    <v-row>
      <v-col>
        Hello {{user?.displayName}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="sendMessage">Send Message</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-for="message of messages" :key="message.messageId">
          <p>
            {{message.user.displayName}} | {{ message.text }} | {{ new Date(Number.parseInt(message.timestamp)) }}
          </p>
          <br/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {QUERY_MESSAGES, QUERY_USER, SUBSCRIPTION_MESSAGE_FEED} from "@/graphql/queries";
import {mapActions} from "vuex";

export default {
  name: "GameBrowser",
  apollo: {
    messages: {
      query: QUERY_MESSAGES,
      subscribeToMore: {
        document: SUBSCRIPTION_MESSAGE_FEED,
        updateQuery: (previousResult, {subscriptionData}) => {
          const newResult = {
            messages: [...previousResult.messages],
          }
          newResult.messages.push(subscriptionData.data.messageFeed)
          return newResult
        },
      }
    },
    user:{
      query:QUERY_USER
    }
  },
  methods: {
    ...mapActions(['sendMessage'])
  }
}
</script>

<style scoped>

</style>