
import ReactDOM from 'react-dom/client';





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//goes between app and app from lecture prop1="hello"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//         <App> prop1="Hello" </App>

// );

import React from 'react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);