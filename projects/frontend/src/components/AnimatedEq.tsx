import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  playing: boolean;
}

const AnimatedEq = ({ playing }: Props) => {
  return (
    <AnimationWrapper playing={playing}>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 251 351"
      >
        <rect
          id="eq-bar-1"
          className="eq-bar"
          x="0.5"
          y="300"
          width="60"
          height="50"
          alignmentBaseline="baseline"
        />
        <rect
          id="eq-bar-2"
          className="eq-bar"
          x="93.8"
          y="300"
          width="60"
          height="50"
          alignmentBaseline="baseline"
        />
        <rect
          id="eq-bar-3"
          className="eq-bar"
          x="187.1"
          y="300"
          width="60"
          height="50"
          alignmentBaseline="baseline"
        />
      </svg>
    </AnimationWrapper>
  );
};

const keyframeOffset = 50;
const makeFrames = (i: number, min = 120, max = 350) => keyframes`
  0% {
    height: ${min + ((i * keyframeOffset) % max)}px;
    y: ${max - (min + ((i * keyframeOffset) % max))}px;
  }
  50% {
    height: ${max}px;
    y: 0px;
  }
  100% {
    height: ${min + ((i * keyframeOffset) % max)}px;
    y: ${max - (min + ((i * keyframeOffset) % max))}px;
  }
`;
const barKeyframes = Array.from(Array(3), (_, i) => makeFrames(i));
const barAnimationMixin = css`
  #eq-bar-1 {
    animation-name: ${barKeyframes[0]};
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
  }

  #eq-bar-2 {
    animation-name: ${barKeyframes[1]};
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
  }

  #eq-bar-3 {
    animation-name: ${barKeyframes[2]};
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
`;

const AnimationWrapper = styled.div<Props>`
  min-width: 10px;
  width: 10px;

  .eq-bar {
    fill: #231f20;
    stroke: #231f20;
    stroke-miterlimit: 10;
  }

  ${({ playing }: Props) => (playing ? barAnimationMixin : '')}
`;

export default AnimatedEq;
