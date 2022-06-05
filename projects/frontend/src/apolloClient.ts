import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

import { ACCESS_KEY } from './auth';
import { getApiUrl } from './util/getApiUrl';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext((_, { headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer: ${localStorage.getItem(ACCESS_KEY)}` || null,
    },
  }));
  return forward(operation);
});

const httpLink = createHttpLink({ uri: `${getApiUrl()}/graphql` });
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  connectToDevTools: true,
});

export default apolloClient;
