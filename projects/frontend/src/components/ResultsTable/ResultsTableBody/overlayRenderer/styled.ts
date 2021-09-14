import styled, { keyframes } from 'styled-components';

export const LoadingLayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0;
  width: 100%;
  height: 100%;
`

export const LoadingMoreLayer = styled.div`
  pointer-events: none;
  background: rgba(32, 60, 94, 0.3);
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`

export const LoadingMoreText = styled.span`
  color: #fff;
  margin-right: 5px;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div<{small?: boolean, color?: string}>`
  display: inline-block;
  border-radius: 100%;
  margin: 2px 2px 2px 4px;
  border: 2px solid ${({color}) => color || '#0696d7'};
  border-bottom-color: transparent;
  min-width: ${props => (props.small ? 12 : 22)}px;
  max-width: ${props => (props.small ? 12 : 22)}px;
  min-height: ${props => (props.small ? 12 : 22)}px;
  max-height: ${props => (props.small ? 12 : 22)}px;
  animation: ${rotate} 0.75s linear infinite;
`