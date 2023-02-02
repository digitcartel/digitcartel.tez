import { ApolloClient, InMemoryCache } from "@apollo/client";

export const OBJKT = new ApolloClient({
  uri: "https://data.objkt.com/v3/graphql",
  cache: new InMemoryCache(),
});
