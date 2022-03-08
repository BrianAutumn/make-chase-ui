import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client/core";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {appConf} from "@/appConf";
import {createApolloProvider} from "@vue/apollo-option";
import {QUERY_ME} from "@/graphql/queries";

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: appConf.apollo.httpUrl,
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: appConf.apollo.wsUrl,
  options: {
    reconnect: true,
    async connectionParams() {
      return {
        authToken:(await apolloClient.query({
          query:QUERY_ME
        })).data.me
      }
    }
  },
})

export const subscriptionClient = wsLink.subscriptionClient;

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})