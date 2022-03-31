import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  // link: createHttpLink({ uri: `` }),
  connectToDevTools: true,
});

const MockProvider: React.FunctionComponent = ({children}) => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename="/">{children}</BrowserRouter>
  </ApolloProvider>
);

export default MockProvider;
