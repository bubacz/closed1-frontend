import withApollo from "next-with-apollo";
import {ApolloClient} from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { createHttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import ws from 'ws';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from "subscriptions-transport-ws";
import { createNetworkInterface } from "apollo-client";
// import fetch from 'isomorphic-unfetch';

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000"
// });

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/`,
//   options: {
//     reconnect: true,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

function createClient({ headers }) {
  // const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  //   reconnect: true,
  // });

  return new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache().restore(headers || {}),
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
    // local data
    // clientState: {
    //   resolvers: {
    //     Mutation: {},
    //   },
    //   defaults: {},
    // },
  });
}

export default withApollo(createClient);
