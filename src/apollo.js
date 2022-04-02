import {ApolloClient, from, HttpLink, InMemoryCache, split} from "@apollo/client/core";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {appConf} from "@/appConf";
import {createApolloProvider} from "@vue/apollo-option";
import {QUERY_SESSION} from "@/graphql/queries";
import {onError} from "apollo-link-error";
import {router} from "@/router";
import {store} from "@/store";

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
        authToken: (await apolloClient.query({
          query: QUERY_SESSION
        })).data.session
      }
    }
  },
})

export const subscriptionClient = wsLink.subscriptionClient;

const errorLink = onError(({response}) => {
  if (response?.errors)
    response.errors = response.errors.filter(({extensions}) => {
      if(extensions?.code === 'UNAUTHENTICATED'){
        store.commit('loginDestination',{path:window.location.pathname})
        router.push({name:'LoginPage'});
        return false;
      }
      return true;
    })
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitLink = split(
  // split based on operation type
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  from([errorLink, wsLink]),
  from([errorLink, httpLink])
)

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})