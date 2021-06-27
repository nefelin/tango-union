import { render } from '@testing-library/react';
import * as React from 'react';
import App from './App';

it('should render the word home', () => {
  const { getByText } = render(<App />);
  const home = getByText(/home/i);
  expect(home).toBeInTheDocument()
});
