import { Options } from 'react-youtube';

const API_MINIMUMS = {
  height: 70,
  width: 120,
};

export const WIDGET_HEIGHT = `${API_MINIMUMS.height * 2.5}px`;
export const WIDGET_WIDTH = `${API_MINIMUMS.width * 2.5}px`;

export const opts = (autoplay?: boolean): Options => ({
  height: WIDGET_HEIGHT,
  width: WIDGET_WIDTH,
  playerVars: {
    autoplay: autoplay ? 1 : 0,
    origin: 'https://tangounion.net'
  },
});
