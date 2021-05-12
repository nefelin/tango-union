import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
const LazyTest = React.lazy(
  () => import(/* webpackChunkName: "TestRoute" */ './components/Test/Test'),
);
const App = () => (
  <BrowserRouter>
    <React.Suspense fallback={Loading}>
      <Switch>
        <Route exact path="/" component={PageOne} />
        <Route exact path="/two" component={PageTwo} />
        <Route exact path="/test" render={() => <LazyTest />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

const PageOne = () => <div>One!</div>;

const PageTwo = () => <div>Two!</div>;

const NotFound = () => {
  const thing: string = 'typecript!!';
  console.log(thing);

  return <div>Not Found!</div>;
};

const Loading = () => <div>Loading...</div>;

export default App;
