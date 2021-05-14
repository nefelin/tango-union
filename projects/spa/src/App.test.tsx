import App from './App';
import { render } from '@testing-library/react';
import * as React from 'react';

it('should render the word home', () => {
  const { getByText } = render(<App />);
  const home = getByText(/home/i);
  expect(home).toBeTruthy()
});
