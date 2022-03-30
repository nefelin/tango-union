import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import BarGraph from '../components/BarGraph/BarGraph';
import { Datum } from '../components/BarGraph/types';

export default {
  title: 'Components/Bar Graph',
  component: BarGraph,
  parameters: {},
} as ComponentMeta<typeof BarGraph>;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: `` }),
  connectToDevTools: true,
  // connectToDevTools: process.env['REACT_APP_ENV'] !== 'prod',
});

const Template: ComponentStory<typeof BarGraph> = (args) => {
  return (
    <div style={{height: 50}}>
      <ApolloProvider client={apolloClient}>
      <BrowserRouter basename="/">
        <BarGraph {...args} />
      </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

const randomDatum = () => {
  const a: Array<Datum<number>> = [];

  for (let i = 1900; i < 2000; i++) {
    a.push({
      label: i.toString(),
      value: Math.floor(Math.random() * 100),
    });
  }
  return a;
};

export const Graph = Template.bind({});
Graph.args = {
  data: randomDatum(),
  selected: [],
};
