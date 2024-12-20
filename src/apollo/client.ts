import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
});

export default client;
