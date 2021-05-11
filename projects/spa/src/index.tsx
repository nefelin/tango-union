import testImg from './test.svg';
import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// // Create heading node
// const heading = document.createElement('h1');
// heading.textContent = 'Interesting!';
//
// // Append heading node to the DOM
// const app = document.querySelector('#root');
// app?.append(heading);

  ReactDOM.render(<App/>, document.getElementById('root'));
