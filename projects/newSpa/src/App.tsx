import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import LandingPage from './features/LandingPage';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
  connectToDevTools: process.env['REACT_APP_ENV'] === 'local',
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <React.Suspense fallback={Loading}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

const Loading = () => <div>Loading</div>;

export default App;
