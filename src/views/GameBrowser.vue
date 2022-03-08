<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="sendMessage">Send Message</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-for="message of messages" :key="message.messageId">
          <p>
            {{ message.text }} | {{ new Date(Number.parseInt(message.timestamp)) }}
          </p>
          <br/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {QUERY_MESSAGES, SUBSCRIPTION_MESSAGE_FEED} from "@/graphql/queries";
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
    }
  },
  methods: {
    ...mapActions(['sendMessage'])
  }
}
</script>

<style scoped>

</style>