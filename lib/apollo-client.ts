import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

// Create an HTTP link to the GraphQL API endpoint
const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
  fetchOptions: {
    method: 'GET',
  },
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
