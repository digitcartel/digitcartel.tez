import { ApolloClient, InMemoryCache } from "@apollo/client";

export const TEZDOM = new ApolloClient({
  uri: "https://api.tezos.domains/graphql",
  cache: new InMemoryCache(),
});
