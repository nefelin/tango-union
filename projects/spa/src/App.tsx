import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={Loading}>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

const Home = () => <div>Home</div>;
const Loading = () => <div>Loading</div>;
const test: string = "fdasfffs";

export default App;
