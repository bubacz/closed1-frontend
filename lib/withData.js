import { ApolloClient } from "apollo-client";
import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';
// import cookie from "js-cookie";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";

const URI = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
const WS_URI = process.env.NODE_ENV === 'development' ? wsEndpoint: wsProdEndpoint;

function createApolloClient({headers}) {
  // console.log("in apolloCLient", ctx);
  // let token;
  let link, httpLink, wsLink;
  const ssrMode = typeof window === "undefined";
  // token = cookie.get("token");
  // console.log("in apolloCLient", token);

  httpLink = new HttpLink({
    uri: URI,
    credentials: "include",
    headers,
    fetch
  });

  if (ssrMode) {
    return new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: new InMemoryCache().restore(headers || {}),
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
      headers,
        });
      },
    });
  } else {
    // on Client...

    const client = new SubscriptionClient(WS_URI, {
      reconnect: true,
      connectionParams: {
        headers,
      }
    });
    wsLink = new WebSocketLink(client);

    link = process.browser
      ? split(
          //only create the split in the browser
          // split based on operation type
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === "OperationDefinition" && operation === "subscription"
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

    return new ApolloClient({
      link,
      cache: new InMemoryCache().restore(headers || {}),
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
      headers,
        });
      },
    });
  }
}


export default withApollo(createApolloClient);