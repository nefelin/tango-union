import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';

import apolloClient from './apolloClient';
import Sandbox from './components/Sandbox/Sandbox';
import Login from './features/Login';
import MobileDashContainer from './features/MobileDash/MobileDashContainer';
import MusicDash from './features/MusicDash';
import RootRedirect from './features/RootRedirect';
import StandalonePlaylist from './features/StandalonePlaylist';
import useViewport from './hooks/useViewport';

const App = () => {
  useViewport(); // for real mobile viewport vh sizing
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename="/">
        <React.Suspense fallback={Loading}>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/:saved" element={<RootRedirect />} />
            <Route path="/desktop" element={<MusicDash />} />
            <Route path="/desktop/:saved" element={<MusicDash />} />
            <Route path="/mobile" element={<MobileDashContainer />} />
            <Route path="/mobile/:saved" element={<MobileDashContainer />} />
            <Route path="/player" element={<MusicDash />} />
            <Route path="/player/:saved" element={<MusicDash />} />
            {/* <Route path="/dndtester" element={<DnDTester/>} /> */}
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playlist/:saved" element={<StandalonePlaylist />} />
            <Route path="/notFound" element={() => <div>Not Found</div>} />
            {/* <Route path="*" element={() => <Navigate to="/notFound" />} /> */}
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const Loading = () => <div>Loading</div>;

export default App;
