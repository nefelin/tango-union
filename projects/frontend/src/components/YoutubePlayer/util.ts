import { Options } from 'react-youtube';

const API_MINIMUMS = {
  height: 200,
  width: 200,
};
const SCALE = 1

export const WIDGET_HEIGHT = `${API_MINIMUMS.height * SCALE}px`;
export const WIDGET_WIDTH = `${API_MINIMUMS.width * SCALE}px`;

export const opts = (autoplay?: boolean): Options => ({
  height: WIDGET_HEIGHT,
  width: WIDGET_WIDTH,
  playerVars: {
    autoplay: autoplay ? 1 : 0,
    origin: 'https://tangounion.net',
    controls: 2
  },
});
