import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={Loading}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

const Home = () => <div>Home</div>;
const Loading = () => <div>Loading</div>;
// const test: string = 2

export default App;
