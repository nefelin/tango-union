import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { songSearcher } from '../../indexer/indexer';
import { Searchbar } from './Searchbar';

const data = require('../../trackData/indexedTestTracks.json');

const index = songSearcher(data);

describe('Search page has the expected elements', () => {
  it('It should have inputs for genre, singer, orchestra, and search', () => {
    render(<Searchbar />);
    const labels = ['Genre', 'Orchestra', 'Singer', 'Search'];
    labels.forEach((label) =>
      expect(
        screen.getByRole('textbox', { name: new RegExp(label, 'i') }),
      ).toBeInTheDocument(),
    );
  });
});

describe('Result table behavior', () => {
  it('should display a row for every search result up to a maximum of 1000', async () => {});
  it('should begin playing the best guess when a row is clicked', async () => {});
  it('should display track details (and alternate links) when row is clicked', async () => {});
});

describe('Player behavior', () => {
  // this line is a little confusing because of youtube integration, maybe we wrap in an interface we own?
  it('should play the next track on the table when a track ends', async () => {});
});

describe('Youtube interaction', () => {
  it('should be able to evaluate confidence of results base on number of words present of total term in video title + desc', async () => {});
});
